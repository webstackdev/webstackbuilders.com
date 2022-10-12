/**
 * This file is called by `setupFilesAfterEnv`, which is executed before each test
 * file is executed but after the testing framework is installed in the environment.
 * The `beforeAll` and `beforeEach` Jest globals are called with resets for the
 * JSDOM environment, which otherwise would retain state between tests (document object).
 */
import { TextDecoder, TextEncoder } from 'util'
import { beforeAll, beforeEach, expect } from '@jest/globals'
import { toHaveNoViolations } from 'jest-axe'
/** Add `jest-dom` to JSDom environment browser globals */
import '@testing-library/jest-dom'
import './extendMatchers'
/* eslint-disable @typescript-eslint/unbound-method */

/** Provide global DOM types */
declare global {
  interface Document {
    [key: string]: unknown
  }
  interface Window {
    [key: string]: unknown
  }
}

/** Add Axe accessibility expectations to global expect object */
expect.extend(toHaveNoViolations)

/**
 * Polyfill to provide TextEncoder and TextDecoder for JSDom
 */
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder

/**
 * Data structure to maintain state of JSDom 'document' and 'window' objects between tests
 */
type NodeMapper = { document: Document; window: Window }
type NodeName = keyof NodeMapper
type eventListenerRecord = {
  type: string
  listener: EventListenerOrEventListenerObject
  options?: boolean | AddEventListenerOptions
}
type SideEffects = {
  [K in NodeName]: {
    addEventListener: {
      fn: NodeMapper[K]['addEventListener']
      refs: eventListenerRecord[]
    }
    keys: string[]
  }
}

const sideEffects: SideEffects = {
  document: {
    addEventListener: {
      fn: document.addEventListener,
      refs: [],
    },
    keys: Object.keys(document),
  },
  window: {
    addEventListener: {
      fn: window.addEventListener,
      refs: [],
    },
    keys: Object.keys(window),
  },
}
const nodeNames = Object.keys(sideEffects) as unknown as NodeName[]

/**
 * Replace addEventListener with mock so that they can be
 * cached and removed on reset between tests
 */
const mockAddEventListener = (nodeName: NodeName) => {
  global[nodeName].addEventListener = (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => {
    const storedListeners = sideEffects[nodeName].addEventListener
    /** Store listener reference so it can be removed during reset */
    storedListeners.refs.push({ type, listener, options })
    /** Call original window.addEventListener */
    storedListeners.fn(type, listener, options)
  }
}

/**
 * Add to the DOM object default key array to prevent removal during reset
 */
const addCachedKey = (nodeName: NodeName) => {
  sideEffects[nodeName].keys.push('addEventListener')
}

/** Remove attributes on root element */
const removeRootAttributes = (rootElement: HTMLElement) => {
  Array.from(rootElement.attributes).forEach(attr => rootElement.removeAttribute(attr.name))
}

/** Remove elements (faster than setting innerHTML) */
const removeRootChildElements = (rootElement: HTMLElement) => {
  while (rootElement.firstChild) {
    rootElement.removeChild(rootElement.firstChild)
  }
}

/** Restore base elements **/
const restoreRootBaseElements = (rootElement: HTMLElement) => {
  rootElement.innerHTML = '<head></head><body></body>'
}

/** Remove listeners */
const removeGlobalListeners = (nodeName: NodeName) => {
  const refs = sideEffects[nodeName].addEventListener.refs
  while (refs.length) {
    // ! is non-null assertion operator since pop() widens type to include 'undefined'
    const { type, listener, options } = refs.pop()!
    global[nodeName].removeEventListener(type, listener, options)
  }
}

/** Remove any added keys to the global JSDOM Windows and Document objects */
const removeGlobalKeys = (nodeName: NodeName) => {
  Object.keys(global[nodeName])
    .filter(key => !sideEffects[nodeName].keys.includes(key))
    .forEach(key => {
      delete global[nodeName][key]
    })
}

/**
 * Soft reset for JSDOM environment and globals. Removes side effects from tests,
 * but does  not reset all changes made to globals like the window and document
 * objects. Tests requiring a full JSDOM reset should be stored in separate files
 * which does a complete JSDOM reset with Jest.
 *
 * - Removes event listeners added to document and window during tests
 * - Removes keys added to document and window object during tests
 * - Remove attributes on <html> element
 * - Removes all DOM elements
 * - Resets document.documentElement HTML to <head></head><body></body>
 */
beforeAll(() => {
  /** Add spy on addEventListener */
  nodeNames.forEach(nodeName => {
    mockAddEventListener(nodeName)
    addCachedKey(nodeName)
  })
})

beforeEach(() => {
  const rootElement = document.documentElement

  removeRootAttributes(rootElement)
  removeRootChildElements(rootElement)

  nodeNames.forEach(nodeName => {
    removeGlobalListeners(nodeName)
    removeGlobalKeys(nodeName)
  })

  restoreRootBaseElements(rootElement)
})

/* eslint-enable @typescript-eslint/unbound-method */
