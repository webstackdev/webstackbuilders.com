module.exports = {
  date: 'Created', // default, resolves to the file created date
  tags: 'services',
  layout: 'page',
  eleventyComputed: {
    permalink: data => '/services/{{ data.slug }}/',
  },
}
