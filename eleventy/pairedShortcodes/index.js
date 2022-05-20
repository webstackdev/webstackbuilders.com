/**
 * Paired shortcodes to specify for use in .eleventy.js with `addPairedShortcode`
 */

// local imports
const { callout } = require('./callout')
const { signup } = require('./signup')

module.exports = {
  /**
   * Special formatting box for callouts in Markdown posts
   */
  callout,

  /**
   * Newsletter Signup CTA
   */
  signup,
}
