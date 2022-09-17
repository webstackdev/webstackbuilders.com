const { titleCase } = require('title-case')

/**
 * Include the page name in the tab title if it's set
 *
 * @param {object} eleventyConfig Config object curried by loading script in .eleventy.js
 * @param {string} title The title set in frontmatter for the page
 * @returns {string} The formatted page title
 *
 * Usage:
 * {% pageTitle this.page.title %}
 */
function pageTitle(eleventyConfig, title) {
  if (typeof title !== 'string') throw new Error(
    `Title passed to Nunjucks pageTitle shortcode is not a string, received:\n${title}`
  )
  const seperator = ` | `
  const casedPageTitle = titleCase(title)
  const casedSiteTitle = titleCase(eleventyConfig.globalData.site.title)
  const pageTitle = title ? `${casedPageTitle}${seperator}${casedSiteTitle}` : casedSiteTitle

  return pageTitle
}

exports.pageTitle = pageTitle
