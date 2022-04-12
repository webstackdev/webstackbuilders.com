// 11ty Plugins
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output')
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language')
const lazyImagesPlugin = require('eleventy-plugin-lazyimages')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const socialImages = require('@11tyrocks/eleventy-plugin-social-images')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

// Local
const eleventySetup = require('./eleventy')

module.exports = function (eleventyConfig) {
  // 11ty Plugins
  eleventyConfig.addPlugin(directoryOutputPlugin)
  eleventyConfig.addPlugin(inclusiveLangPlugin, {
    templateFormats: ['md', 'njk'], // default is 'md'
  })
  // @TODO: eleventyConfig.addPlugin(lazyImagesPlugin, eleventySetup.handlers.lazyImagesHandler)
  eleventyConfig.addPlugin(pluginRss)
  // Social images provides an addNbsp filter for use in templates that inserts a non-breaking space
  // between the last two words in the title to prevent a single word dangling on the last line
  eleventyConfig.addPlugin(socialImages)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addWatchTarget('./src/sass/')

  /**
   * Files to pass through to the `public` folder
   */
  // Copy `src/assets/fonts` to `public/assets/fonts`
  eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'fonts' })
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'images' })
  // @TODO: NOT working, favicon needs to go in the root directory but addPassthroughCopy doesn't take relative path prefixes
  eleventyConfig.addPassthroughCopy({ 'src/assets/images/favicon.*': '' })

  /**
   * Shortcodes for use in templates
   */
  eleventyConfig.addShortcode('img', eleventySetup.shortcodes.imgShortcode)
  eleventyConfig.addShortcode('year', eleventySetup.shortcodes.year)
  eleventyConfig.addShortcode('youtube', eleventySetup.shortcodes.youtube)

  eleventyConfig.addFilter('exclude', eleventySetup.filters.exclude)
  eleventyConfig.addFilter('slug', eleventySetup.filters.slugify)
  eleventyConfig.addFilter('withCategory', eleventySetup.filters.withCategory)

  eleventyConfig.setLibrary('md', eleventySetup.library.markdownLib)

  /**
   * Use the 404 error page on dev server, Netlify picks it up automatically in production with a redirect
   */
  eleventyConfig.setBrowserSyncConfig(eleventySetup.handlers.pageNotFoundHandler)

  /**
   * HTML minification
   */
  // @TODO: See the minify:html package.json script for an alternative instead of doing this in build process
  //eleventyConfig.addTransform('htmlmin', eleventySetup.handlers.htmlMinifyHandler)

  eleventyConfig.setEjsOptions({
    rmWhitespace: true,
    context: {
      dateFns,
    },
  })

  return {
    // default 11ty template engine used to preprocess markdown files and allow
    // preprocessor syntax like includes and shortcodes in markdown is liquid.
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public',
      includes: '_components',
      layouts: '_layouts',
    },
  }
}
