// 11ty Plugins
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output')
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language')
//const lazyImagesPlugin = require('eleventy-plugin-lazyimages')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const socialImages = require('@11tyrocks/eleventy-plugin-social-images')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

// Local
const eleventySetup = require('./eleventy')
//const criticalCss = require('./eleventy/transforms/criticalCss')

/** @param { import('./@types/eleventy').Config } config */
module.exports = (eleventyConfig) => {
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
  // eleventyConfig.addPlugin(criticalCss)

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
  Object.keys(eleventySetup.shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, eleventySetup.shortcodes[shortcodeName])
  })

  /**
   * Paired Shortcodes and Nunjucks Tags for use in templates
   */
  Object.keys(eleventySetup.pairedShortcodes).forEach((pairedShortcodeName) => {
    eleventyConfig.addPairedShortcode(
      pairedShortcodeName,
      eleventySetup.pairedShortcodes[pairedShortcodeName]
    )
  })

  /**
   * Filters for use in templates
   */
  Object.keys(eleventySetup.filters).forEach((filterName) => {
      eleventyConfig.addFilter(filterName, eleventySetup.filters[filterName])
  })

  /**
   * Configured markdown-it instance, also used in markdown shortcodes
   */
  eleventyConfig.setLibrary('md', eleventySetup.library.markdownLib)

  /**
   * Use the 404 error page on dev server, Netlify picks it up automatically in production with a redirect
   */
  eleventyConfig.setBrowserSyncConfig(eleventySetup.handlers.pageNotFoundHandler)

  /**
   * @TODO: needs refactored, right now this is production build tasks like HTML minification and critical CSS
   */
  if (process.env.ELEVENTY_ENV === 'production') {
    Object.keys(eleventySetup.transforms).forEach((transformName) => {
      //eleventyConfig.addTransform(transformName, eleventySetup.transforms[transformName])
    })
  }

  return {
    dir: {
      /**
       * Global data template files directory, available to all templates. This is the
       * default but included here for visibility with the other core directories.
       */
      data: '_data',

      /**
       * The top level directory/file/glob used to look for templates, such as Markdown
       * files or 11ydata.js / 11ydata.json / (subdir|markdownFilename).json files
       *
       * 1. For `posts/subdir/my-first-blog-post.md`:
       *   posts/subdir/my-first-blog-post.11tydata.js
       *   posts/subdir/my-first-blog-post.11tydata.json
       *   posts/subdir/my-first-blog-post.json
       * 2. For all templates in subdir: posts/subdir/subdir.11tydata.js, etc.
       * 3. For parent directory, applies to all subdirectories: posts/posts.11tydata.js , etc.
       */
      input: 'src',

      /**
       * Directory for Eleventy layouts, include files, extends files, partials,
       * or macros. These files will not be processed as full template files, but
       * can be consumed by other templates. Must be a nested directory of `input`.
       */
      includes: '_layouts',

      /**
       * The directory inside which the finished site source will be written to.
       */
      output: 'public',
    },

    /**
     * Liquid is the default 11ty template engine used to preprocess html.
     * Files and allow preprocessor syntax like includes and shortcodes in html.
     */
    htmlTemplateEngine: 'njk',

    /** Liquid is the default 11ty template engine used to preprocess markdown
     * files and allow preprocessor syntax like includes and shortcodes in markdown.
     */
    markdownTemplateEngine: 'njk',

    /**
     * ejs can be embedded in json data files for values
     */
    templateFormats: ['11ty.js', 'ejs', 'md', 'njk'],
  }
}
