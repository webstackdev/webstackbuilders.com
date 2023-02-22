/**
 * Use the Configuration API 'getFilter' method to use a filter inside of a shortcode.
 */

/**
 * Wrap a key with an anchor link to the collection page if there
 * is content tagged with the key
 */
const { conditionalTagLink } = require('./conditionalTagLink')
exports.conditionalTagLink = conditionalTagLink

/**
 * Normalize a camelCased tag name to something suitable for publishing
 */
const { normalizeTagName } = require('./normalizeTagName')
exports.normalizeTagName = normalizeTagName

/**
 * Page description for meta headers
 */
const { pageDescription } = require('./pageDescription')
exports.pageDescription = pageDescription

/**
 * Page description for meta headers
 */
const { pageSocialImg } = require('./pageSocialImg')
exports.pageSocialImg = pageSocialImg

/**
 * Include the page name in the tab title if it's set
 */
const { pageTitle } = require('./pageTitle')
exports.pageTitle = pageTitle
