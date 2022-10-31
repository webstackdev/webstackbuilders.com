/**
 * Utilities for use in Jest setup script `beforeEach` and similar functions
 */
import { getState, type removalCb } from './state'

/**
 * Remove tracked global listeners from both state and the DOM
 */
export const removeTrackedGlobalEventListeners = () => {
  /**
   * Remove tracked event listener from global 'window' and 'document' objects
   */
  const removeGlobalEventListenerCallback: removalCb = (nodeName, { type, listener, options }) => {
    globalThis[nodeName].removeEventListener(type, listener, options)
  }
  /**
   * Callback is called on each event listener removed from
   * tracking for 'window' and 'document' global objects.
   */
  const state = getState()
  state.resetEventListenerTracking(removeGlobalEventListenerCallback)
}

/**
 * Remove any added keys to the global JSDOM Windows and Document objects
 */
export const removeGlobalKeys = () => {
  getState().nodeNames.forEach(globalName => {
    Object.keys(global[globalName])
      .filter(getState().filterTrackedGlobalKeys(globalName))
      .forEach(key => {
        // @ts-ignore no index signature of type 'string' on global
        delete globalThis[globalName][key]
      })
  })
}

/** Remove attributes on root element */
export const removeRootAttributes = (rootElement: HTMLElement) => {
  Array.from(rootElement.attributes).forEach(attr => rootElement.removeAttribute(attr.name))
}

/** Remove elements (faster than setting innerHTML) */
export const removeRootChildElements = (rootElement: HTMLElement) => {
  while (rootElement.firstChild) {
    rootElement.removeChild(rootElement.firstChild)
  }
}

/** Restore base HTML page elements **/
export const restoreRootBaseElements = (rootElement: HTMLElement) => {
  rootElement.innerHTML = '<head></head><body></body>'
}
