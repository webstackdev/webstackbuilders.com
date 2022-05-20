const port = process.env.PORT ?? 8080

module.exports = {
  url: process.env.ELEVENTY_ENV === 'production' ? 'https://webstackbuilders.com' : `http://localhost:${port}`,
  name: 'Webstack Builders',
  title: 'Webstack Builders Company Website',
  description: 'This is the company website for Webstack Builders',
  lang: "en",
  locale: "en_US",
  domain: "webstackbuilders.com",
}
