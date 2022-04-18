// 11ty Plugins
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output')
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language')
//const lazyImagesPlugin = require('eleventy-plugin-lazyimages')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const socialImages = require('@11tyrocks/eleventy-plugin-social-images')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

// Local
const eleventySetup = require('./eleventy')

/** @param { import('./@types/eleventy').Config } config */
module.exports = function (eleventyConfig) {
  /**
   * Use `.eleventyignore` for dev server files to watch instead of default `.gitignore`
   */
  eleventyConfig.setUseGitIgnore(false)

  /**
   * Since Webpack and SASS are compiling files to the `public` directory directly,
   * set a timeout so those processes have time to complete before 11ty watch fires.
   */
  eleventyConfig.setWatchThrottleWaitTime(100) // in milliseconds

  /**
   * Map default layouts to the base nunjucks file in _layouts
   */
  //eleventyConfig.addLayoutAlias('default', 'base.njk')

  /**
   *  11ty Plugins
   */
  eleventyConfig.addPlugin(directoryOutputPlugin)
  eleventyConfig.addPlugin(inclusiveLangPlugin, {
    templateFormats: ['md', 'njk'], // default is 'md'
  })
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(socialImages)
  eleventyConfig.addPlugin(syntaxHighlight)
  // eleventyConfig.addPlugin(lazyImagesPlugin, eleventySetup.handlers.lazyImagesHandler)

  /**
   * Watch compiled assets for changes. When the file or the files
   * in this directory change Eleventy will trigger a build. Files
   * are updated by Webpack workflow when scss or js files change.
   */
  eleventyConfig.addWatchTarget('./src/assets/scss/index.css')
  eleventyConfig.addWatchTarget('./src/assets/script/index.js')

  /**
   * Files to pass through to the `public` folder. Strips `input` from the path (`src` here).
   */
  eleventyConfig.addPassthroughCopy('src/images')
  eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'fonts' })

  /**
   * Shortcodes and Nunjucks Tags for use in templates
   */
  eleventyConfig.addShortcode('img', eleventySetup.shortcodes.imgShortcode)
  eleventyConfig.addShortcode('year', eleventySetup.shortcodes.year)
  eleventyConfig.addShortcode('youtube', eleventySetup.shortcodes.youtube)

  /**
   * Filters for use in templates
   */
  eleventyConfig.addFilter('dateDisplay', eleventySetup.filters.dateDisplay)
  eleventyConfig.addFilter('exclude', eleventySetup.filters.exclude)
  eleventyConfig.addFilter('squash', eleventySetup.filters.squash)
  eleventyConfig.addFilter('slug', eleventySetup.filters.slugify)
  eleventyConfig.addFilter('withCategory', eleventySetup.filters.withCategory)

  /**
   * Configured markdown-it instance, also used in markdown shortcodes
   */
  eleventyConfig.setLibrary('md', eleventySetup.library.markdownLib)

  /**
   * Use the 404 error page on dev server, Netlify picks it up automatically in production with a redirect
   */
  eleventyConfig.setBrowserSyncConfig(eleventySetup.handlers.pageNotFoundHandler)

  /**
   * HTML minification
   */
  if (process.env.ELEVENTY_ENV === 'production') {
    eleventyConfig.addTransform('htmlmin', eleventySetup.handlers.htmlMinifyHandler)
  }

  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: '_components',
      layouts: '_layouts',
    },
    // Liquid is the default 11ty template engine used to preprocess html
    // files and allow preprocessor syntax like includes and shortcodes in html.
    htmlTemplateEngine: 'njk',
    // Liquid is the default 11ty template engine used to preprocess markdown
    // files and allow preprocessor syntax like includes and shortcodes in markdown.
    markdownTemplateEngine: 'njk',
    // ejs can be embedded in json data files for values
    templateFormats: ['11ty.js', 'ejs', 'md', 'njk'],
  }
}
