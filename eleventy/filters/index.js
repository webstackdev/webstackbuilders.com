/**
 * Filters to specify for use in .eleventy.js with `addFilter`
 */
const { DateTime } = require('luxon')
const slugifyLib = require('slugify')

/**
 * Add a friendly date filter to nunjucks. Defaults to format of
 * `LLLL d, y` unless an alternate is passed as a parameter.
 * {{ date | friendlyDate('OPTIONAL FORMAT STRING') }}
 * List of supported tokens: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
 */
exports.dateDisplay = (dateObj, format = 'LLL d, y') => {
  return DateTime.fromJSDate(dateObj, {
    zone: 'utc',
  }).toFormat(format)
}

/**
 *  Example using Liquid templating engine: {% assign taggers = tip.data.tags | exclude: "tips" %}
 */
exports.exclude = (values, itemToExclude) => {
  return values.filter(value => value !== itemToExclude)
}

exports.section = require('./section')

/**
 *  11ty has a built-in `slugify` filter
 */
// @TODO: refactor slugify to slugifyTitleAnchors in eleventy/library/markdown
exports.slugify = str => {
  if (!str) return

  return slugifyLib(str, {
    lower: true,
    strict: true,
    remove: /["]/g,
  })
}

exports.squash = require('./squash')

/**
 * Example using Liquid templating engine: {% assign category = collections.categories | withCategory: "articles" %}
 */
exports.withCategory = (values, category) => {
  return values.find(value => value.data.key === category)
}
