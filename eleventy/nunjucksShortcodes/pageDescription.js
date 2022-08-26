/**
 * Page description for meta headers
 *
 * @param {object} eleventyConfig Config object curried by loading script in .eleventy.js
 * @param {object} input Using Nunjucks named parameters, so a single input object as param
 * @param {string} input.pageDescription The description set in frontmatter for the page
 * @returns string The formatted page description
 *
 * Usage:
 * {% pageDescription pageDescription=this.page.description %}
 */
function pageDescription(eleventyConfig, input) {
  return input.pageDescription ?? eleventyConfig.globalData.site.title
}

exports.pageDescription = pageDescription
