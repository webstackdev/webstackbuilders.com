/**
 * Shortcodes to specify for use in .eleventy.js with `addShortcode`
 */

// local imports
const { customMarkdownShortcode } = require('./markdown')
const { imgShortcode } = require('./img')
const { youtubeShortcode } = require('./youtube')

module.exports = {
  /**
   * Allows using Markdown inside tags in a Nunjucks or other template file
   */
  customMarkdownShortcode,

  /**
   * Uses @11ty/eleventy-img for image processing, returns image tag contents
   */
  imgShortcode,

  /**
   * Page description for meta headers
   */
  pageDescription: function() {
    return this.page.description ??  this.ctx.meta.siteDescription
  },

  /**
   * Page description for meta headers
   */
  pageSocialImg: function() {
    const slug = this.page.title ? this.page.title >>> slug : `home`
    return `${this.ctx.meta.url}/previews/${slug}.png`
  },

  /**
   * Include the page name in the tab title if it's set
   */
  pageTitle: function() {
    const title = this.page.title ?  `${this.page.title} | ` : ''
    return `${title}${this.ctx.meta.siteName}`
  },

  /**
   * Embeds a Youtube player in minified HTML
   */
  youtubeShortcode,

  /**
   * Get the year as a four-digit number
   */
  year: function () { return new Date().getFullYear() },
}
