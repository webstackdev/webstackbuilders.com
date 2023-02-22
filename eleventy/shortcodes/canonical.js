const validUrl = require('valid-url')
const packageJson = require('../../package.json')

/**
 * Determine the canonical URL for a page
 * Usage: {% canonical permalink %}
 *
 * @param {object} _ Config object curried by loading script in .eleventy.js
 * @param {string} permalink The Eleventy permalink set in frontmatter
 * @returns {string} A valid URI representing the canonical link to the page
 */
exports.canonical = (_, permalink) => {
  if (validUrl.isUri(permalink)) throw new Error(
    `Permalink passed to canonical shortcode is already a valid URI: ${permalink}`
  )
  if (permalink.charAt(0) !== '/') {
    return `https://www.${packageJson.domain}/${permalink}`
  }
  return `https://www.${packageJson.domain}${permalink}`
}
