/**
 * Utilities for use in Jest setup script `beforeEach` and similar functions
 */
import { sideEffects, nodeNames } from './state'

/** Remove any added keys to the global JSDOM Windows and Document objects */
export const removeGlobalKeys = () => {
  nodeNames.forEach(nodeName => {
    Object.keys(global[nodeName])
      .filter(key => !sideEffects[nodeName].keys.includes(key))
      .forEach(key => {
        // @ts-ignore no index signature of type 'string' on global
        delete global[nodeName][key]
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

/** Restore base elements **/
export const restoreRootBaseElements = (rootElement: HTMLElement) => {
  rootElement.innerHTML = '<head></head><body></body>'
}
