/**
 * Global site data available to all templates
 */
const { lang, locale, organization, title, description, domain } = require('../../package.json')

let url
switch (process.env.ELEVENTY_ENV) {
  case 'development':
    url = `http://localhost:${process.env.ELEVENTY_DEV_SERVER_PORT}`
    break
  case 'testing':
    url = `http://localhost:${process.env.ELEVENTY_TESTING_SERVER_PORT}`
    break
  default:
    url = `https://www.${domain}`
}

module.exports = {
  description,
  domain,
  lang,
  locale,
  organization,
  title,
  url,
}
