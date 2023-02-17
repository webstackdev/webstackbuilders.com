const packageJson = require('../../package.json')

/**
 * Determine the canonical URL for a page
 *
 * @param _
 * @param page
 */
exports.canonical = (_, permalink) => {
  return `https://www.${packageJson.domain}${permalink}`
}
