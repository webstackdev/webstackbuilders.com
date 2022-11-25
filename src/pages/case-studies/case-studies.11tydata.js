module.exports = {
  active: true,
  date: 'Created', // default, resolves to the file created date
  tags: 'case-studies',
  layout: 'page',
  eleventyComputed: {
    permalink: function (data) {
      return this.getPermalinkPath(data)
    }, // absolute
  },
}
