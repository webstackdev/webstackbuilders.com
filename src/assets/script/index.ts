/**
 * Site script. All scripts to include in the site must be included here.
 */
import { addAllLoaderEventListeners, addErrorEventListeners } from './utils/listeners'
import type { ScriptInit } from './@types/general'
//import { heroSvgAnimation } from './animations'
//import { cookieModalHandler } from './modals/cookies'
//import { registerShareHighlight } from './modules/share-highlight'
//import { setupNavigation } from './modules/navigation'
//import { setupThemeSwitcher } from './modules/themepicker'
//import { registerServiceWorker } from './utils/externalScripts'

/**
 * Scripts to execute when the Load event fires. Load event fires when all assets loaded,
 * the page has everything ready and users can interact with it. Scripts should be a
 * function that will be called with no parameters after the event fires.
 */
export const scriptsFiredOnLoaded: ScriptInit[] = [
  //registerServiceWorker
]

/**
 * Scripts to execute when the DOMContentLoaded event fires. The DOMContentLoaded
 * event fires when all the nodes in the page have been constructed in the DOM
 * tree but before loading all resources such as images. Scripts should be a
 * function that will be called with no parameters after the event fires.
 */
export const scriptsFiredOnDomLoaded: ScriptInit[] = [
  //heroSvgAnimation,
  //registerShareHighlight,
  //setupNavigation,
  //setupThemeSwitcher,
]

/**
 * Scripts that will be execute on first user interaction with the site
 * or after a delay (default 5 seconds), whichever occurs first.
 */
export const scriptsFiredOnUserInteraction: ScriptInit[] = [
  //cookieModalHandler,
]

/** Add global load event handlers */
addAllLoaderEventListeners(
  scriptsFiredOnLoaded,
  scriptsFiredOnDomLoaded,
  scriptsFiredOnUserInteraction
)

/** Add global unhandled exception and unhandled rejection handlers */
addErrorEventListeners()
