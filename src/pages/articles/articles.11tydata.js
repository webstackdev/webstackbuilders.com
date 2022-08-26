module.exports = {
  date: 'Created', // default, resolves to the file created date
  tags: 'articles',
  layout: 'article',
  eleventyComputed: {
    permalink: data => '/article/{{ data.slug }}/',
  },
  featured: false,
}
