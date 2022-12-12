/**
 * Site script. All scripts to include in the site must be included here.
 */
import { addAllLoaderEventListeners } from './utils/loaders'
import { addErrorEventListeners } from './utils/errorListeners'
import type { ScriptInit } from './@types/general'
/** Client scripts */
import { heroSvgAnimation } from './animations'
//import { initImagesLazyLoad } from './modules/lazyload'
//import { showCookieConsentModal } from './modals/cookieConsent'
//import { registerShareHighlight } from './modules/share-highlight'
import { setupNavigation } from './modules/navigation'
import { setupThemePicker } from './modules/themePicker'
//import { registerServiceWorker } from './modules/serviceWorker/registerer'

// @TODO: Are there any tasks that we need to pause using visibility API like animations when user leaves page? See modules/visibility.ts

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
  heroSvgAnimation,
  //initImagesLazyLoad,
  //registerShareHighlight,
  setupNavigation,
  setupThemePicker,
]

/**
 * Scripts that will be execute on first user interaction with the site
 * or after a delay (default 5 seconds), whichever occurs first.
 */
export const scriptsFiredOnUserInteraction: ScriptInit[] = [
  //showCookieConsentModal,
]

/** Add global load event handlers */
addAllLoaderEventListeners(
  scriptsFiredOnLoaded,
  scriptsFiredOnDomLoaded,
  scriptsFiredOnUserInteraction
)

/** Add global unhandled exception and unhandled rejection handlers */
addErrorEventListeners()
