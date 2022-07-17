/**
 * This file is called by `setupFilesAfterEnv`, which executed before each test
 * file is executed but after the testing framework is installed in the environment.
 * The `beforeAll` and `beforeEach` Jest globals are called with resets for the
 * JSDOM environment, which otherwise would retain state between tests (document object).
 */
const { toHaveNoViolations } = require('jest-axe')
const { TextEncoder, TextDecoder } = require('util')

/**
 * Add jest-dom
 */
require('@testing-library/jest-dom')

/**
 * Add Axe accessibility expectations to global expect object
 */
expect.extend(toHaveNoViolations)

/**
 * Polyfill to provide TextEncoder and TextDecoder for JSDom
 */
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

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
const sideEffects = {
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

beforeAll(async () => {
  /** Spy addEventListener */
  ;['document', 'window'].forEach(obj => {
    const fn = sideEffects[obj].addEventListener.fn
    const refs = sideEffects[obj].addEventListener.refs

    function addEventListenerSpy(type, listener, options) {
      /** Store listener reference so it can be removed during reset */
      refs.push({ type, listener, options })
      /** Call original window.addEventListener */
      fn(type, listener, options)
    }

    /** Add to default key array to prevent removal during reset */
    sideEffects[obj].keys.push('addEventListener')

    /** Replace addEventListener with mock */
    global[obj].addEventListener = addEventListenerSpy
  })
})

beforeEach(async () => {
  const rootElement = document.documentElement

  /** Remove attributes on root element */
  ;[...rootElement.attributes].forEach(attr => rootElement.removeAttribute(attr.name))

  /** Remove elements (faster than setting innerHTML) */
  while (rootElement.firstChild) {
    rootElement.removeChild(rootElement.firstChild)
  }

  /** Remove global listeners and keys */
  ;['document', 'window'].forEach(obj => {
    const refs = sideEffects[obj].addEventListener.refs

    /** Listeners */
    while (refs.length) {
      const { type, listener, options } = refs.pop()
      global[obj].removeEventListener(type, listener, options)
    }

    /** Keys */
    Object.keys(global[obj])
      .filter(key => !sideEffects[obj].keys.includes(key))
      .forEach(key => {
        delete global[obj][key]
      })
  })

  /** Restore base elements **/
  rootElement.innerHTML = '<head></head><body></body>'
})
