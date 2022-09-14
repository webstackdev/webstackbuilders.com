/**
 * Site script. All scripts to include in the site must be included here.
 */
import { heroSvgAnimation } from './animations'
import { setupThemeSwitcher } from './modules'
import { promiseErrorHandler } from './modules/utils'

import './errorHandlers'

document.addEventListener('DOMContentLoaded', () => {
  setupThemeSwitcher()
  heroSvgAnimation()
  // @TODO: need to load share-highlight module
})

/** All assets loaded, the page has everything ready and users can interact with it */
document.addEventListener('load', () => {
  navigator.serviceWorker.register('/service-worker.js').catch(promiseErrorHandler)
})
