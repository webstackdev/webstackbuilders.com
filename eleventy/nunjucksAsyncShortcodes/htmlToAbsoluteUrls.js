/**
 * Over-rides of 'htmlToAbsoluteUrls' shortcode provided by the '@11ty/eleventy-plugin-rss'
 * plugin so that they provide a 'localhost' URL in development mode.
 * https://github.com/11ty/eleventy-plugin-rss/blob/master/.eleventy.js
 */
const posthtml = require('posthtml')
const urls = require('posthtml-urls')

const convertHtmlToAbsoluteUrls = async (
  eleventyConfig,
  htmlContent,
  base,
  processOptions = {}
) => {
  let options = {
    eachURL: function (url) {
      return base ? base : eleventyConfig.getFilter('absoluteUrl')(url.trim())
    },
  }

  let modifier = posthtml().use(urls(options))

  let result = await modifier.process(htmlContent, processOptions)
  return result.html
}

exports.htmlToAbsoluteUrls = async (eleventyConfig, htmlContent, base, callback) => {
  if (!htmlContent) {
    callback(null, '')
    return
  }

  let posthtmlOptions = {
    // default PostHTML render options
      closingSingleTag: 'slash',
    ...options.posthtmlRenderOptions
  }

  convertHtmlToAbsoluteUrls(eleventyConfig, htmlContent, base, posthtmlOptions).then(html => {
    callback(null, html)
  })
}
