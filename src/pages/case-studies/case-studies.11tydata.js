module.exports = {
  date: 'Created', // default, resolves to the file created date
  tags: 'case-studies',
  layout: 'page',
  eleventyComputed: {
    permalink: data => '/case-studies/{{ data.slug }}/',
  },
}
