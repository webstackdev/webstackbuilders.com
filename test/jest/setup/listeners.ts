/**
 * Soft reset for JSDOM environment and globals. Removes side effects from tests,
 * but does  not reset all changes made to globals like the window and document
 * objects:
 * - Removes event listeners added to document and window during tests
 * - Removes keys added to document and window object during tests
 */
import { removeGlobalKeys } from './reset'
import { addCachedKey, sideEffects, nodeNames } from './state'

/**
 * Replace addEventListener with proxy so listeners can be
 * cached and removed on reset between tests.
 */
export const trackGlobalListeners = () => {

  nodeNames.forEach(nodeName => {
    global[nodeName].addEventListener = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) => {
      /**
       * Used by error event listener added in environment to control whether
       * to emit unhandled exception or not depending on whether client-provided
       * error handlers are in use.
       */
      if (type === 'error') globalThis.USER_ERROR_LISTENER_COUNT++

      const storedListeners = sideEffects[nodeName].addEventListener
      /** Store listener reference so it can be removed during reset */
      storedListeners.refs.push({ type, listener, options })
      /** Call original window.addEventListener */
      storedListeners.fn(type, listener, options)
    }
    /** maintenance to prevent a default key in data structure being removed during reset */
    addCachedKey(nodeName)
  })
}

/**
 * Remove listeners
 */
export const removeAllGlobalListeners = () => {
  nodeNames.forEach(nodeName => {
    const refs = sideEffects[nodeName].addEventListener.refs
    while (refs.length) {
      // ! is non-null assertion operator since pop() widens type to include 'undefined'
      const { type, listener, options } = refs.pop()!
      global[nodeName].removeEventListener(type, listener, options)
    }
  })
}

/**
 * Called in setup beforeAll method
 */
export const setupEventListenerProxies = () => {
  trackGlobalListeners()
}

/**
 * Called in setup beforeEach method
 */
export const removeEventListenerProxies = () => {
  removeAllGlobalListeners()
  removeGlobalKeys()
}
