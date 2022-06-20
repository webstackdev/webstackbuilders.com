/**
 * Site script. All scripts to include in the site must be included here.
 */
import { heroSvgAnimation } from './animations'
import { setupThemeSwitcher } from './themepicker'

// Unhandled exception handler
window.onerror = function (msg, source, lineno, colno, error) {
  const message = [
    'Message: ' + msg,
    'URL: ' + source,
    'Line: ' + lineno,
    'Column: ' + colno,
    'Error object: ' + JSON.stringify(error),
  ].join(' - ')

  alert(message)

  // Prevent the firing of the default event handler
  return true
}

// equivalent to jquery's document ready
document.addEventListener('DOMContentLoaded', () => {
  setupThemeSwitcher()
  heroSvgAnimation()
})

// step 10, all assets loaded, the page has everything ready and users can interact with it
window.addEventListener('load', () => {
  // here you can access anything in the page, and everything is ready
})
