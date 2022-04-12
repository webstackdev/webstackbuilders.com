/**
 * Filters to specify for use in .eleventy.js with `addFilter`
 */
const slugifyLib = require('slugify')

/**
 *  Example using Liquid templating engine: {% assign taggers = tip.data.tags | exclude: "tips" %}
 */
exports.exclude = (values, itemToExclude) => {
  return values.filter(value => value !== itemToExclude)
}

// @TODO: is this different than 11ty's built-in `slugify` filter?
exports.slugify = str => {
  if (!str) return

  return slugifyLib(str, {
    lower: true,
    strict: true,
    remove: /["]/g,
  })
}

/**
 * Example using Liquid templating engine: {% assign category = collections.categories | withCategory: "articles" %}
 */
exports.withCategory = (values, category) => {
  return values.find(value => value.data.key === category)
}
