const { titleCase } = require('title-case')

/**
 * Include the page name in the tab title if it's set
 *
 * @param {object} eleventyConfig Config object curried by loading script in .eleventy.js
 * @param {string} title The title set in frontmatter for the page
 * @returns {string} The formatted page title
 *
 * Usage:
 * {% pageTitle pageTitle=this.page.title %}
 */
function pageTitle(eleventyConfig, title) {
  const casedTitle = titleCase(title) ? `${titleCase(title)} | ` : ''
  return `${casedTitle}${titleCase(eleventyConfig.globalData.site.title)}`
}

exports.pageTitle = pageTitle
