/**
 * Paired shortcodes to specify for use in .eleventy.js with `addPairedShortcode`
 *
 * Use the Configuration API 'getFilter' method to use a filter inside of a shortcode.
 */

// local imports
const { callout } = require('./callout')
exports.callout = callout


/**
 * Allows using Markdown inside shortcode in a Nunjucks or other template file
 */
const { customMarkdownShortcode } = require('./markdown')
exports.customMarkdownShortcode = customMarkdownShortcode

const { signup } = require('./signup')
exports.signup = signup
