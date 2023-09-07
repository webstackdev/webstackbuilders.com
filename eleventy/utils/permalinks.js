/**
 * Remove leading slashes, the build directory path, and the file stem from
 * what we get from Eleventy in the `page.outputFileExtension` property.
 * Leaves the path with a trailing slash.
 *
 * @param {string} rawFilePathStem - the file path stem given in Eleventy's 'page.filePathStem' object.
 * @returns {string} - a relative file path usable for permalinks.
 */
const normalizeFilePathStem = rawFilePathStem => {
  // strip the leading slash
  return rawFilePathStem
    .replace(/^\/+/, '') // strip the leading slash if it exists
    .replace(/^pages\//, '')
    .replace(/[^\/]*$/, '') // remove the extension-less file name from the path
}
exports.normalizeFilePathStem = normalizeFilePathStem

/**
 * For use in frontmatter to set permalinks. Permalinks should be a relative
 * file path, starting from the output directory and not including it. Handles
 * `draft` boolean key set in frontmatter.
 *
 * @param {object} data - the data object passed to eleventy computed front matter fields
 * @returns {string} - the relative path to the web page
 * @example  To use in Eleventy Javascript `*.11tydata.js` directory files,
 * include the following in the `.eleventy.js` file:
 * const eleventySetup = require('./eleventy')
 * module.exports = eleventyConfig => {
 *   ...
 *   eleventyConfig.addJavaScriptFunction('getPermalinkPath', eleventySetup.utils.getPermalinkPath)
 *   ...
 * }
 */
exports.getPermalinkPath = data => {
  // Always skip during non-watch/serve builds
  if (data.draft && !process.env.BUILD_DRAFTS) {
    return false
  }
  return normalizeFilePathStem(data.page.filePathStem)
}

/**
 * Set an environmental flag to build drafts when in local server mode, and to not output
 * files when in production build. Handled in `eleventy/utils/permalink.js` utility used
 * to set permalink in computed data.
 *
 * @example In the .eleventy.js file include the following:
 * const eleventySetup = require('./eleventy')
 * module.exports = eleventyConfig => {
 *   ...
 *   eleventySetup.utils.initDraftHandler(eleventyConfig)
 *   ...
 * }
 */
exports.initDraftHandler = eleventyConfig => {
  eleventyConfig.on('eleventy.before', ({ runMode }) => {
    // Set the environment variable
    if (runMode === 'serve' || runMode === 'watch') {
      process.env.BUILD_DRAFTS = true
    }
  })
}
