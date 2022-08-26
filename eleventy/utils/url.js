/**
 * Determine appropriate base URL for the site so that links work
 * in both development (using localhost) and production environments.
 */
const { domain } = require('../../package.json')

exports.getBaseURL = () => {
  switch (process.env.ELEVENTY_ENV) {
    case 'development':
      return `http://localhost:${process.env.ELEVENTY_DEV_SERVER_PORT}`
    case 'testing':
      return `http://localhost:${process.env.ELEVENTY_TESTING_SERVER_PORT}`
    default:
      return `https://www.${domain}`
  }
}
