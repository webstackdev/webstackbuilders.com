/**
 * For use in *.11tydata.js eleventyComputed frontmatter
 *
 * @param {object} data - the data object passed to eleventy computed front matter fields
 * @returns {string} - the relative path to the image file
 */
const getCoverImageFilePath = data => {
  /* eslint-disable-next-line no-prototype-builtins */
  if (data.hasOwnProperty('cover') && data.cover.length !== 0) {
    return data.cover
  } else {
    return `cover.webp`
  }
}

module.exports = {
  type: 'post',
  tags: 'articles',
  layout: 'article',
  eleventyComputed: {
    cover: data => getCoverImageFilePath(data), // relative
    permalink: function (data) {
      return this.getPermalinkPath(data)
    },
  },
  featured: false,
}
