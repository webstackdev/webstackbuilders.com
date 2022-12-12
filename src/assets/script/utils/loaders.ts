/**
 * Site script loaders
 */
import type { ScriptInit, ScriptInitFn } from '../@types/general'
import { addDelayedExecutionScripts } from './delayedLoader'

/**
 * Load event fires when all assets loaded, the page has everything ready and
 * users can interact with it.
 */
export const addLoadedEventListeners: ScriptInitFn = (scriptsFiredOnLoaded: ScriptInit[]) => {
  if (!scriptsFiredOnLoaded.length) return
  scriptsFiredOnLoaded.forEach(script => {
    window.addEventListener('load', (_: Event) => script())
  })
}

/**
 * The DOMContentLoaded event fires when all the nodes in the page have been
 * constructed in the DOM tree but before loading all resources such as images.
 */
export const addDomLoadedEventListeners: ScriptInitFn = (scriptsFiredOnDomLoaded: ScriptInit[]) => {
  if (!addDomLoadedEventListeners.length) return
  scriptsFiredOnDomLoaded.forEach(script => {
    window.addEventListener('DOMContentLoaded', (_: Event) => script())
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
