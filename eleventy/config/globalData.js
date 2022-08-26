const {
  author,
  lang,
  locale,
  organization,
  title,
  description,
  domain,
  email,
} = require('../../package.json')
const buildPaths = require('../../scripts/build/paths')
const { getBaseURL } = require('../utils/url')

/**
 * Add site global data keys
 *
 * @returns {object} Keys with global data e.g. baseUrl, description, title
 */
exports.getSiteGlobalData = () => {
  return {
    author,
    baseUrl: getBaseURL(),
    description,
    domain,
    email,
    lang,
    locale,
    organization,
    title,
  }
}

/**
 * Add stats global data keys
 *
 * @returns {object} Keys for timestamp and env
 */
exports.getStatsGlobalData = () => {
  return {
    timestamp: Date(),
    env: process.env.ELEVENTY_ENV,
  }
}

/**
 * Adds the build paths file as a global data key for
 * use e.g. in _generate/feed.njk frontmatter
 *
 * @returns {object} Keys for the exported constants in scripts/build/paths.js
 */
exports.getBuildPathsGlobalData = () => {
  const buildPathObj = {}
  for (const pathName of Object.keys(buildPaths)) {
    /* eslint-disable-next-line security/detect-object-injection */
    buildPathObj[pathName] = buildPaths[pathName]
  }
  return buildPathObj
}
