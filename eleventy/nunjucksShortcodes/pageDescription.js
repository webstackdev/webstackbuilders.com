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
  if (typeof description !== 'string' && typeof description !== 'undefined')
    throw new Error(
      `Description passed to Nunjucks pageTitle shortcode is not a string, received:\n${description}`
    )
  return description ? description : eleventyConfig.globalData.site.title
}

exports.pageDescription = pageDescription
