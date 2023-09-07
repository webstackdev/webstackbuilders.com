/**
 * Helpers to use with Eleventy config file `addCollection()` calls.
 */

/** @typedef { import('./@types/TemplateCollection') } TemplateCollection */

/**
 * Get a collection object with any of the array of tags given
 *
 * @param { TemplateCollection } collection - 11ty collections object
 * @param {Array} tagNames - Array of tag names to filter all collections for
 * @returns { TemplateCollection }
 */
exports.getFilteredByOneOfTags = (collection, tagNames) => {
  return collection
    .getAllSorted()
    .filter(item => {
      if (!tagName) {
        return true
      } else if (Array.isArray(item.data.tags)) {
        return item.data.tags.some(tag => tag === tagName)
      }
      return false
    })
}