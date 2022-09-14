/**
 * Page description for meta headers
 *
 * @param {object} eleventyConfig Config object curried by loading script in .eleventy.js
 * @param {string} description The description set in frontmatter for the page
 * @returns {string} The formatted page description
 *
 * Usage:
 * {% pageDescription pageDescription=this.page.description %}
 */
function pageDescription(eleventyConfig, description) {
  return description ?? eleventyConfig.globalData.site.title
}

exports.pageDescription = pageDescription
