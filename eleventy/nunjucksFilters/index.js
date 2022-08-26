/**
 * Filters to specify for use in .eleventy.js with `addFilter`
 *
 * Use the Configuration API 'getFilter' method to use a
 * filter inside of another filter or shortcode.
 *
 * Filters take a single input on the left, modify this inline and return a single value:
 *   {{ "mike" | upcase  }}
 */

/**
 * Over-ride of plugin provided absoluteUrl method from '@11ty/eleventy-plugin-rss'
 */
const { absoluteUrl } = require('./absoluteUrl')
exports.absoluteUrl = absoluteUrl
