module.exports = {
  active: true,
  date: 'Created', // default, resolves to the file created date
  tags: 'services',
  layout: 'page',
  eleventyComputed: {
    permalink: function (data) {
      return this.getPermalinkPath(data)
    }, // absolute
  },
}
