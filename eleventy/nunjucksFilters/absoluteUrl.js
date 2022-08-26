/**
 * Over-rides of 'absoluteUrl' Nunjucks Filter provided by the '@11ty/eleventy-plugin-rss'
 * plugin so that they provide a 'localhost' URL in development mode. From @Zachleat:
 * `It is canonical behavior to override built-in filters with your own`
 */
const { URL } = require('url')

/**
 * Return a fully resolved URL based on whether the environment is production or development
 *
 * Usage:
 * <a href="{{ '/about' | absoluteUrl }}">About Me</a>
 * Result:
 * <a href="https://pdehaan.dev/about">About Me</a>
 *
 * @param {import('../../@types/eleventyConfig').Config} eleventyConfig 11ty config object
 * @param {string} url the page URL to build a fully qualified URL with
 * @returns {string} fully qualified URL
 */
// .eleventy.js
exports.absoluteUrl = (eleventyConfig, url) => {
  return new URL(url, eleventyConfig.globalData.site.baseUrl).href
}
