const { titleCase } = require('title-case')

/**
 * Include the page name in the tab title if it's set
 *
 * @param {object} eleventyConfig Config object curried by loading script in .eleventy.js
 * @param {object} input Using Nunjucks named parameters, so a single input object as param
 * @param {string} input.pageTitle The title set in frontmatter for the page
 * @returns string The formatted page title
 *
 * Usage:
 * {% pageTitle pageTitle=this.page.title %}
 */
function pageTitle(eleventyConfig, input) {
  const title = titleCase(input.pageTitle) ? `${titleCase(input.pageTitle)} | ` : ''
  return `${title}${titleCase(eleventyConfig.globalData.site.title)}`
}

exports.pageTitle = pageTitle
