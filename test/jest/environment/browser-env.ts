/**
 * Custom Jest environment to add globals. Environment setup/teardown methods here
 *  are executed before/after every test file in its own environment. Added as a
 * testEnvironment in test/jest/jest.config.jsdom.ts
 */
import { clearImmediate, setImmediate } from 'timers'
import { TextDecoder, TextEncoder } from 'util'
import { ModuleMocker } from 'jest-mock'
import { installCommonGlobals } from 'jest-util'
import { JSDOM } from 'jsdom'
import type { Context } from 'vm'
import type {
  EnvironmentContext,
  JestEnvironment,
  JestEnvironmentConfig
} from '@jest/environment'
import type { LegacyFakeTimers, ModernFakeTimers } from '@jest/fake-timers'
import type { Global } from '@jest/types'
import { isJsdomSetOnGlobal, errorEventListener } from './error'
import { getJsdomQuietModeFlag } from '../jsdomQuietMode'
import { getJsdomInstance } from './jsdomEnv'
import {
  getCustomExportConditions,
  getLegacyFakeTimers,
  getModernFakeTimers,
} from './helpers'
import { addEventHandlerArgsProcessor, removeEventHandlerArgsProcessor } from './listeners'

/**
 * Merge project declarations with global DOM types
 */
/* eslint-disable no-var */
declare global {
  /** Accessible both as `window.JSDOM_QUIET_MODE` as well as `JSDOM_QUIET_MODE` directly */
  var JSDOM_QUIET_MODE: boolean
  /** State to swap in unhandled exception emitter if no user error listeners registered */
  var USER_ERROR_LISTENER_COUNT: number

  /**  Merge this interface definition with the Document interface defined in lib.dom.d.ts */
  //interface Document {
  //[key: string]: unknown
  //}

  /** Merge this interface definition with the Window interface defined in lib.dom.d.ts */
  interface Window {
    /**
     * The `Window` interface does not have an `Error.stackTraceLimit`
     * property, but `JSDOMEnvironment` assumes it is there.
     */
    Error: {
      stackTraceLimit: number
    }
    //[key: string]: unknown
  }
}
/* eslint-enable no-var */

/**
 * Custom Jest JSDOM environment that resets the complete environment between test
 * cases if `addEventListener` is mocked, and otherwise tracks event listeners and
 * other DOM items to clean up between tests using `beforeEach` and `afterEach`
 * in Jest setup file for JSDOM.
 */
/* eslint-disable no-null/no-null, @typescript-eslint/require-await */
export default class JSDomTscompileEnvironment implements JestEnvironment<number> {
  /**
   * Used to set the global object available in sandboxed test suites. Type
   * forced by base interface, would be easier if it was `typeof globalThis`.
   */
  global: Global.Global
  fakeTimers: LegacyFakeTimers<number> | null
  fakeTimersModern: ModernFakeTimers | null
  moduleMocker: ModuleMocker | null
  /** JSDOM-specific environment properties */
  dom: JSDOM | null
  /**
   * Expose helpers per runner that the user can call during unit tests by attaching
   * a static method to the runner class that is callable from within the tests.
   */
  private errorEventListener: ((event: Event & { error: Error }) => void) | null
  /** State for `exportConditions()` class method set from `projectConfig` */
  customExportConditions: string[]
  /**
   * Quiet mode to silence JSDOM's virtual console output and avoid
   * a wall of red output on tests that are intended to throw.
   */
  JSDOM_QUIET_MODE: boolean
  /**
   * beforeEach and afterEach handlers to silence JSDOM's
   * console output in test as set by pragma.
   */
  USER_ERROR_LISTENER_COUNT: number

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    const { projectConfig } = config
    const { globals: projectGlobalsToInstall, testEnvironmentOptions } = projectConfig

    this.dom = getJsdomInstance(context.console, testEnvironmentOptions)

    /**
     * GLOBAL HANDLING CODE
     */

    /**
     * In browsers, `document.defaultView` returns the window object associated
     * with a document, or null if none is available. The `jsdom.jsdom` function
     * returns `window.document` and to use the window it is necessary to use
     * `window.document.defaultView` which normally references the first window.
     */
    this.global = this.dom.window.document.defaultView as unknown as Global.Global
    /**
     * Will throw a reference error if global is assigned to before the const declaration
     * but is a also still the "universal" global object after the const declaration.
     * */
    const global = this.global
    /** Throws if JSDOM isn't set on the `globalThis` object */
    isJsdomSetOnGlobal()
    /** For third-party code using `global` instead of `globalThis` */
    global.global = global as unknown as typeof globalThis
    /** Global symbols for Jest's internal use inside the sandboxed environment */
    installCommonGlobals(global as unknown as typeof globalThis, projectGlobalsToInstall)
    /** Maybe unnecessary */
    global.Buffer = Buffer

    /** Error-message stack size is set by default to 10 */
    this.global.Error.stackTraceLimit = 100

    // Report uncaught errors.
    this.errorEventListener = errorEventListener
    global.addEventListener('error', errorEventListener)

    // Don't report errors as uncaught if the user listens to 'error' event.
    // In that case, we assume there might be custom error handling logic.
    const originalAddListener = global.addEventListener.bind(global)
    global.addEventListener = function (...args: Parameters<typeof global.addEventListener>) {
      addEventHandlerArgsProcessor(args)
      return originalAddListener.apply(this, args)
    }

    const originalRemoveListener = global.removeEventListener.bind(global)
    global.removeEventListener = function (...args: Parameters<typeof global.addEventListener>) {
      removeEventHandlerArgsProcessor(args)
      return originalRemoveListener.apply(this, args)
    }

    /**
     * SET INHERITED CLASS PROPERTIES
     */
    this.customExportConditions = getCustomExportConditions(testEnvironmentOptions)
    this.moduleMocker = new ModuleMocker(global as unknown as typeof globalThis)
    this.fakeTimers = getLegacyFakeTimers(
      global as unknown as typeof globalThis,
      projectConfig,
      this.moduleMocker
    )
    this.fakeTimersModern = getModernFakeTimers(
      global as unknown as typeof globalThis,
      projectConfig
    )

    /**
     * SET GLOBAL STATE
     */
    this.JSDOM_QUIET_MODE = getJsdomQuietModeFlag(context)
    this.USER_ERROR_LISTENER_COUNT = 0
    /** Make global state available in test suites */
    Object.assign(global, {
      JSDOM_QUIET_MODE: this.JSDOM_QUIET_MODE,
      USER_ERROR_LISTENER_COUNT: this.USER_ERROR_LISTENER_COUNT,
    })
  }

  /** Runs before each test file */
  async setup(): Promise<void> {
    /**
     * Not defined in JSDOM environment but needed by test helpers that call Eleventy and Webpack
     */
    this.global.clearImmediate = clearImmediate
    this.global.setImmediate = setImmediate

    /**
     * Polyfill to provide TextEncoder and TextDecoder for JSDom
     */
    this.global.TextEncoder = TextEncoder
    // @ts-ignore util type definition does not match global type definition but they're the same
    this.global.TextDecoder = TextDecoder
  }

  /** Runs after each test file */
  async teardown(): Promise<void> {
    if (this.fakeTimers) this.fakeTimers.dispose()
    if (this.fakeTimersModern) this.fakeTimersModern.dispose()

    if (this.global !== null) {
      if (this.errorEventListener) {
        this.global.removeEventListener('error', this.errorEventListener)
      }

      /**
       * Window.close() method closes the current window. Can only be called
       * on windows that were opened by a script using Window.open().
       */
      this.global.close()

      /**
       * Dispose "document" to prevent "load" event from triggering. Note that
       * this.global.close() will trigger the CustomElement::disconnectedCallback.
       * Do not reset the document before CustomElement disconnectedCallback function
       * has finished running, document should be accessible within disconnectedCallback.
       */
      Object.defineProperty(this.global, 'document', { value: null })
    }

    this.errorEventListener = null
    // @ts-ignore type this.global in extended interface not allowed to be `null`
    this.global = null
    this.dom = null
    this.fakeTimers = null
    this.fakeTimersModern = null
  }

  /**
   * Should return an array of conditions that will be passed along with Jest's
   * defaults to custom module path resolver functions specified in Jest config.
   */
  exportConditions(): Array<string> {
    return this.customExportConditions
  }

  /**
   * Mandatory to export starting from Jest 27. ES Modules are only supported
   * if the test environment has the `getVmContext` function.
   */
  getVmContext(): Context | null {
    if (this.dom) {
      return this.dom.getInternalVMContext()
    }
    return null
  }
}
/* eslint-enable no-null/no-null, @typescript-eslint/require-await */
