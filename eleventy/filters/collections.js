/**
 * Usage:
 * {%- set currentPage = collections.all | currentPage(page) -%}
 * {%- set autoDescription = currentPage.templateContent | excerpt | safe | striptags -%}
 *
 * @param {object} _ - A curried EleventyConfig object from '.eleventy.js'
 * @param {Array} allPages - Array of collection objects to get the current page from
 * @param {string} currentPage - The file path of the current page to retrieve
 * @returns {object} - A collection object for the current page
 */
exports.currentPage = (_, allPages, currentPage) => {
  const matches = allPages.filter(page => page.inputPath === currentPage.inputPath)
  if (matches && matches.length) {
    return matches[0]
  }
  return undefined
}

/**
 * Example using Liquid templating engine:
 * {% assign taggers = tip.data.tags | exclude: "tips" %}
 *
 * @param {object} _ - A curried EleventyConfig object from '.eleventy.js'
 * @param {Array} values - An array of values to filter over
 * @param {unknown} itemToExclude - The value to exclude from the array
 * @returns {Array} - Returns a new filtered array
 */
exports.exclude = (_, values, itemToExclude) => {
  return values.filter(value => value !== itemToExclude)
}

/**
 * Usage:
 * {% set otherposts = collections.posts | excludeItemFromCollection(page) | slice(-10) %}
 *
 * @param {object} _ - A curried EleventyConfig object from '.eleventy.js'
 * @param {Array} collection - Array of collection objects to filter by excluded item
 * @param {string} itemToExclude - The file path of the item to exclude from the collection
 * @returns {Array} - Returns a filtered array of collection objects
 */
exports.excludeItemFromCollection = (_, collection, itemToExclude) => {
  return collection.filter(item => item.inputPath !== itemToExclude.inputPath)
}

/**
 * Find item in associative array by key. Usage:
 * {%- set dark = themes|findById('dark') -%}
 *
 * @param {object} _ - A curried EleventyConfig object from '.eleventy.js'
 * @param {object} object - The object you want to find a key in
 * @param {string|number|symbol} id - The key to find
 * @returns {unknown} Returns the value for the given key
 */
exports.findById = (_, object, id) => {
  return object[id]
}

/**
 * Usage:
 * {% set otherposts = collections.posts | excludePost(page) | slice(-10) %}
 *
 * @param {object} _ - A curried EleventyConfig object from '.eleventy.js'
 * @param {Array} array - The array to slice
 * @param {number} start - The beginning element to slice from, can use negative numbers to slice from end
 * @param {number} end - Optional, the last element to slice up to
 * @returns {unknown} Returns a new array with the sliced elements
 */
exports.slice = (_, array, start, end) => {
  return end ? array.slice(start, end) : array.slice(start)
}

/**
 * Example using Liquid templating engine:
 * {% assign category = collections.categories | withCategory: "articles, case-studies" %}
 *
 * @param {object} _ - A curried EleventyConfig object from '.eleventy.js'
 * @param {Array} collectionItems - array of collection objects to filter by tag on
 * @param {string} categories - a string or space separated list of categories the value must contain one of
 * @returns {boolean} whether the passed category is a tag on the item
 */
exports.withCategory = (_, collectionItems, categories) => {
  const categoryArray = categories.split(/[, ]+/)
  return collectionItems.filter(collectionItem => {
    let isIncluded = false
    collectionItem.data.tags.filter(tag => {
      if (categoryArray.includes(tag)) isIncluded = true
    })
    return isIncluded
  })
}
