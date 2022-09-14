const { socialImagesBuildDir } = require(`../../scripts/build/paths`)

/**
 * Absolute URL link to a social image for the page to use as share image
 *
 * @param {object} eleventyConfig Config object curried by loading script in .eleventy.js
 * @param {string} slug The slug for this page
 * @returns {string} The formatted page description
 *
 * Usage:
 * {% pageSocialImg slug=this.page.fileSlug %}
 */
function pageSocialImg(eleventyConfig, slug) {
  const slugWithDefault = slug ?? 'home'
  return `${eleventyConfig.globalData.site.baseUrl}/${socialImagesBuildDir}/${slugWithDefault}.png`
}

exports.pageSocialImg = pageSocialImg
