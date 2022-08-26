const { socialImagesBuildDir, socialImagesFormat } = require(`../../scripts/build/paths`)

/**
 * Link to a social image for the page to use as share image
 *
 * @param {object} eleventyConfig Config object curried by loading script in .eleventy.js
 * @param {object} input Using Nunjucks named parameters, so a single input object as param
 * @param {string} input.slug The slug for this page
 * @returns string The formatted page description
 *
 * Usage:
 * {% pageSocialImg slug=this.page.fileSlug %}
 */
function pageSocialImg(eleventyConfig, input) {
  const slug = input.slug ?? 'home'
  return `${eleventyConfig.globalData.site.baseUrl}/${socialImagesBuildDir}/${slug}.${socialImagesFormat}`
}

exports.pageSocialImg = pageSocialImg
