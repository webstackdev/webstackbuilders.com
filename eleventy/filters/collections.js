/**
 * Usage:
 *   {%- set currentPage = collections.all | currentPage(page) -%}
 *   {%- set autoDescription = currentPage.templateContent | excerpt | safe | striptags -%}
 */
exports.currentPage = (allPages, currentPage) => {
  const matches = allPages.filter(page => page.inputPath === currentPage.inputPath)
  if (matches && matches.length) {
    return matches[0]
  }
  return null
}

/**
 * Example using Liquid templating engine:
 *   {% assign taggers = tip.data.tags | exclude: "tips" %}
 */
exports.exclude = (values, itemToExclude) => {
  return values.filter(value => value !== itemToExclude)
}

/**
 * Usage:
 *   {% set otherposts = collections.posts | excludeItemFromCollection(page) | slice(-10) %}
 */
exports.excludeItemFromCollection = (collection, itemToExclude) => {
  return collection.filter(item => item.inputPath !== itemToExclude.inputPath)
}

/**
 * Find item in associative array by key. Usage:
 *   {%- set dark = themes|findById('dark') -%}
 */
exports.findById = (array, id) => {
  return array.find(i => i.id === id)
}

/**
 * Usage:
 *   {% set otherposts = collections.posts | excludePost(page) | slice(-10) %}
 */
exports.slice = (array, start, end) => {
  return end ? array.slice(start, end) : array.slice(start)
}

/**
 * Example using Liquid templating engine:
 *   {% assign category = collections.categories | withCategory: "articles" %}
 */
exports.withCategory = (values, category) => {
  return values.find(value => value.data.key === category)
}
