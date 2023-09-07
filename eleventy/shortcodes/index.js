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
 * Returns <svg> block for using SVG icon sprite by icon name
 */
const { icon } = require('./icon')
exports.icon = icon

/**
 * Format a phone number in numeric format e.g. `(213) 373-4253`
 */
const { formatPhoneNumber } = require('./formatPhoneNumber')
exports.formatPhoneNumber = formatPhoneNumber

/**
 * Embed Youtube as shortcode in markdown by video ID
 */
const { youtubeShortcode } = require('./youtube')
exports.youtubeShortcode = youtubeShortcode
