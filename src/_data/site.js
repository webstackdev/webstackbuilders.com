let url
switch (process.env.ELEVENTY_ENV) {
  case 'development':
    url = `http://localhost:${process.env.ELEVENTY_DEV_SERVER_PORT}`
    break
  case 'testing':
    url = `http://localhost:${process.env.ELEVENTY_TESTING_SERVER_PORT}`
    break
  default:
    url = 'https://webstackbuilders.com'
}

module.exports = {
  url,
  name: 'Webstack Builders',
  title: 'Webstack Builders Company Website',
  description: 'This is the company website for Webstack Builders',
  lang: 'en',
  locale: 'en_US',
  domain: 'webstackbuilders.com',
}
