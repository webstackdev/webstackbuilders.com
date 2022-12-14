/**
 * Front matter for Services items
 */
const { getCoverImageFilePath, getPermalinkPath } = require('../../../eleventy/utils')

module.exports = {
  active: true,
  date: 'Created', // default, resolves to the file created date
  tags: 'services',
  layout: 'layouts/services/item',
  eleventyComputed: {
    cover: data => {
      return getCoverImageFilePath(data) // returns relative path
    },
    permalink: data => {
      return getPermalinkPath(data) // returns absolute path
    },
  },
}
