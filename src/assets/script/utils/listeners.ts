/**
 * Site script. All scripts to include in the site must be included here.
 */
import type { ScriptInit, ScriptInitFn } from '../@types/general'
import { unhandledExceptionHandler, unhandledRejectionHandler } from '../errors/handlers'
import { addDelayedExecutionScripts } from './delayedLoader'

/**
 * Load event fires when all assets loaded, the page has everything ready and
 * users can interact with it.
 */
export const addLoadedEventListeners: ScriptInitFn = (scriptsFiredOnLoaded: ScriptInit[]) => {
  if (!scriptsFiredOnLoaded.length) return
  scriptsFiredOnLoaded.forEach(script => {
    document.addEventListener('load', (_: Event) => script())
  })
}

/**
 * The DOMContentLoaded event fires when all the nodes in the page have been
 * constructed in the DOM tree but before loading all resources such as images.
 */
export const addDomLoadedEventListeners: ScriptInitFn = (scriptsFiredOnDomLoaded: ScriptInit[]) => {
  if (!addDomLoadedEventListeners.length) return
  scriptsFiredOnDomLoaded.forEach(script => {
    document.addEventListener('DOMContentLoaded', (_: Event) => script())
  })
}

/**
 * Single entry point to call from `index.ts` for script loader events
 */
export const addAllLoaderEventListeners = (
  scriptsFiredOnDomLoaded: ScriptInit[],
  scriptsFiredOnLoaded: ScriptInit[],
  scriptsFiredOnUserInteraction: ScriptInit[]
) => {
  scriptsFiredOnLoaded && addLoadedEventListeners(scriptsFiredOnLoaded)
  scriptsFiredOnDomLoaded && addDomLoadedEventListeners(scriptsFiredOnDomLoaded)
  scriptsFiredOnUserInteraction && addDelayedExecutionScripts(scriptsFiredOnUserInteraction)
}


/**
 * The `error` event is fired on a Window object when a resource failed to load or couldn't be used — for example if a script has an execution error. This event is not cancelable and does not bubble.
 */
export const addUnhandledExceptionEventListeners = () => {
  window.addEventListener('error', event => unhandledExceptionHandler(event))
}

/**
 * The `unhandledrejection` event is sent to the global scope of a script when a JavaScript Promise that has no rejection handler is rejected; typically, this is the window, but may also be a Worker.
 */
export const addUnhandledRejectionEventListeners = () => {
  window.addEventListener('unhandledrejection', event => unhandledRejectionHandler(event))
}

/**
 * Single entry point to call from `index.ts` for error event handlers
 */
export const addErrorEventListeners = () => {
  addUnhandledExceptionEventListeners()
  addUnhandledRejectionEventListeners()
}
