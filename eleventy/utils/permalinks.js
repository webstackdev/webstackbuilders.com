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
 * file path, starting from the output directory and not including it.
 *
 * @param {object} data - the data object passed to eleventy computed front matter fields
 * @returns {string} - the relative path to the web page
 */
exports.getPermalinkPath = data => {
  return normalizeFilePathStem(data.page.filePathStem)
}
