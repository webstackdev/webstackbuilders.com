const { startCase } = require('lodash')
const { exceptions } = require('../../src/_data/tags')

/**
 * Wrap a key with an anchor element if there is a tag collection for the key
 *
 * @param {undefined} _ Config object curried by loading script in .eleventy.js
 * @param {string} tag The tag name to normalize
 * @returns {string} The formatted page title
 *
 * Usage:
 * {% normalizeTagName "cms" %}
 */
function normalizeTagName(_, tag) {
  if (typeof tag !== 'string')
    throw new Error(
      `Key passed to Nunjucks normalizeTagName shortcode is not a string, received:\n${tag}`
    )
  if (tag in exceptions) return exceptions[tag]
  return startCase(tag)
}

exports.normalizeTagName = normalizeTagName
