// 11ty Plugins
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output')
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language')
const socialImages = require('@11tyrocks/eleventy-plugin-social-images')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginRss = require('@11ty/eleventy-plugin-rss')

// Helper packages
const slugifyLib = require('slugify')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

// Local utilities/data
//const packageVersion = require('./package.json').version

module.exports = function (eleventyConfig) {
  // 11ty Plugins
  eleventyConfig.addPlugin(directoryOutputPlugin)
  eleventyConfig.addPlugin(inclusiveLangPlugin, {
    templateFormats: ['md', 'njk'], // default is 'md'
  })
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(socialImages)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addWatchTarget('./src/sass/')

  eleventyConfig.addPassthroughCopy('./src/css')
  eleventyConfig.addPassthroughCopy('./src/fonts')
  eleventyConfig.addPassthroughCopy('./src/img')
  eleventyConfig.addPassthroughCopy('./src/favicon.png')

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)
  //eleventyConfig.addShortcode("packageVersion", () => `v${packageVersion}`)

  eleventyConfig.addFilter('slug', slugify)

  eleventyConfig.setLibrary('md', markdownLib)

  return {
    dir: {
      input: 'src',
      output: 'public',
      layouts: '_layouts',
    },
  }
}

const slugify = str => {
  if (!str) return

  return slugifyLib(str, {
    lower: true,
    strict: true,
    remove: /["]/g,
  })
}

const markdownLib = markdownIt({
  html: true,
}).use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.ariaHidden({
    class: 'tdbc-anchor',
    space: false,
  }),
  level: [1, 2, 3],
  slugify,
})
