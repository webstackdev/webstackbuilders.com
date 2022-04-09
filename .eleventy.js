// Core packages
const fs = require('fs')

// 11ty Plugins
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output')
const htmlmin = require('html-minifier')
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language')
const lazyImagesPlugin = require('eleventy-plugin-lazyimages')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const socialImages = require('@11tyrocks/eleventy-plugin-social-images')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

// Helper packages
const dateFns = require('date-fns')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItEmoji = require('markdown-it-emoji')
const slugifyLib = require('slugify')

// Local utilities/data
const NOT_FOUND_PATH = 'public/404.html'

module.exports = function (eleventyConfig) {
  // 11ty Plugins
  eleventyConfig.addPlugin(directoryOutputPlugin)
  eleventyConfig.addPlugin(inclusiveLangPlugin, {
    templateFormats: ['md', 'njk'], // default is 'md'
  })
  eleventyConfig.addPlugin(lazyImagesPlugin, lazyImagesHandler)
  eleventyConfig.addPlugin(pluginRss)
  // Include the addNbsp filter for use in templates that inserts a non-breaking space between
  // the last two words in the title to prevent a single word dangling on the last line
  eleventyConfig.addPlugin(socialImages)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addWatchTarget('./src/sass/')

  eleventyConfig.addPassthroughCopy('./src/css')
  eleventyConfig.addPassthroughCopy('./src/fonts')
  eleventyConfig.addPassthroughCopy('./src/img')
  eleventyConfig.addPassthroughCopy('./src/favicon.png')

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

  eleventyConfig.addFilter('slug', slugify)

  eleventyConfig.setLibrary('md', markdownLib)

  eleventyConfig.setBrowserSyncConfig(pageNotFoundHandler)

  eleventyConfig.addTransform('htmlmin', htmlMinifyHandler)

  eleventyConfig.setEjsOptions({
    rmWhitespace: true,
    context: {
      dateFns,
    },
  })

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

/**
 * Configuration for lazy images
 */
const lazyImagesHandler = {
  transformImgPath: imgPath => {
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      // Handle remote file
      return imgPath
    } else {
      return `./src/img/${imgPath}`
    }
  },
}

/**
 * Markdown Configuration
 */
const markdownLib = markdownIt({
  html: true,
})
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      class: 'tdbc-anchor',
      space: false,
    }),
    level: [1, 2, 3],
    slugify,
  })
  .use(markdownItEmoji)

/**
 * Minify HTML
 */
const htmlMinifyHandler = (content, outputPath) => {
  if (outputPath.endsWith('.html')) {
    const minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
    })
    return minified
  }

  return content
}

/**
 * 404 error page routing for use by dev server, this can be removed in 11ty v2
 */
const pageNotFoundHandler = {
  callbacks: {
    ready: (err, bs) => {
      bs.addMiddleware('*', (req, res) => {
        if (!fs.existsSync(NOT_FOUND_PATH)) {
          throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one.`)
        }
        const content_404 = fs.readFileSync(NOT_FOUND_PATH)
        // Add 404 http status code in request header.
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' })
        // Provides the 404 content without redirect.
        res.write(content_404)
        res.end()
      })
    },
  },
}
