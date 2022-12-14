/**
 * Get the coverage image relative file path for an item page, providing a default if
 * cover is not set.
 *
 * @param data {Object} - the data object passed to eleventy computed front matter fields
 * @returns {string} - the relative path to the cover image
 */
exports.getCoverImageFilePath = data => {
  /* eslint-disable-next-line no-prototype-builtins */
  if (data.hasOwnProperty('cover') && data.cover.length !== 0) {
    return data.cover
  } else {
    return `cover.webp`
  }
}
