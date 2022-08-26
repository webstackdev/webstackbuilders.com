/**
 * Shortcodes to specify for use in .eleventy.js with `addShortcode`
 *
 * Use the Configuration API 'getFilter' method to use a filter inside of a shortcode.
 */

/**
 * Determine the canonical URL for a page
 */
const { canonical } = require('./canonical')
exports.canonical = canonical

/**
 * Allows using Markdown inside tags in a Nunjucks or other template file
 */
const { customMarkdownShortcode } = require('./markdown')
exports.customMarkdownShortcode = customMarkdownShortcode

/**
 * Returns <svg> block for using SVG icon sprite by icon name
 */
const { icon } = require('./icon')
exports.icon = icon

/**
 * Embed Youtube as shortcode in markdown by video ID
 */
const { youtubeShortcode } = require('./youtube')
exports.youtubeShortcode = youtubeShortcode

/**
 * Get the year as a four-digit number
 */
const { year } = require('./year')
exports.year = year
