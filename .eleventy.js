const _ = require('lodash')
const buildPaths = require('./scripts/build/paths')
const { EleventyRenderPlugin } = require('@11ty/eleventy')
const { serviceTags } = require('./src/_data/tags')

// load environmental variables if not already loaded
if (!process.env.ELEVENTY_ENV_VARS_INIT) {
  require('dotenv').config({ path: './.env.local' })
}

// Local setup in the eleventy directory, like filters and shortcodes
const eleventySetup = require('./eleventy')
const {
  getBuildPathsGlobalData,
  getSiteGlobalData,
  getStatsGlobalData,
} = require('./eleventy/config/globalData')
const { addEleventyPlugins, disabled, enabled } = require('./eleventy/config/plugins')

/** @param { import('./@types/eleventyConfig').Config } eleventyConfig */
module.exports = eleventyConfig => {
  /** built-in plugin to render templates from templates */
  eleventyConfig.addPlugin(EleventyRenderPlugin)

  /**
   * Build paths available as global variables for use in e.g. src/_generate templates
   */
  eleventyConfig.addGlobalData('buildPaths', getBuildPathsGlobalData())
  /**
   * Global data for use in build logging: `timestamp` and `env`
   */
  eleventyConfig.addGlobalData('stats', getStatsGlobalData())

  /**
   * Add site global data keys: `author`, `baseUrl`, `description`,
   * `domain`, `email`, `lang`, `locale`, `organization`, `title`
   */
  eleventyConfig.addGlobalData('site', getSiteGlobalData())

  /**
   * Use `.eleventyignore` for dev server files to watch instead of default `.gitignore`
   */
  eleventyConfig.setUseGitIgnore(false)

  /**
   * Since Webpack and SASS are compiling files to the `public` directory directly,
   * set a timeout so those processes have time to complete before 11ty watch fires.
   */
  eleventyConfig.setWatchThrottleWaitTime(100) // in milliseconds

  /** Setting for '@11ty/eleventy-plugin-directory-output' */
  eleventyConfig.setQuietMode(true)

  /**
   *  11ty Plugins
   */
  addEleventyPlugins(eleventyConfig, {
    /**
     * Set navigation in frontmatter under 'eleventyNavigation' item with 'tag' and
     * optional 'parent' elements, generates navigation and breadcrumbs from shortcode
     * in Nunjucks or Liquid templates.
     */
    '@11ty/eleventy-navigation': enabled,

    /**
     * Group and sort Eleventy CLI verbose build output by directory with file size and benchmarks
     */
    '@11ty/eleventy-plugin-directory-output': enabled,

    /**
     * Outputs command line warnings for weasel words like "obviously", "basically", etc.
     */
    '@11ty/eleventy-plugin-inclusive-language': disabled,

    /**
     * RSS feed generator, adds shortcode filters absoluteUrl, dateToRfc3339, dateToRfc822.
     */
    '@11ty/eleventy-plugin-rss': enabled,

    /**
     * Generates images as headers for use in social shares
     */
    '@11tyrocks/eleventy-plugin-social-images': enabled,

    /**
     * Provides a shortcode to generate a JSON-LD script per-page including the <script> tag.
     */
    '@quasibit/eleventy-plugin-schema': enabled,

    /**
     * Provides a shortcode to generate a sitemap.xml file using _generate/sitemap.njk
     */
    '@quasibit/eleventy-plugin-sitemap': enabled,

    /**
     * Adds `target="_blank" rel="noreferrer"` to all external links
     */
    '@sardine/eleventy-plugin-external-links': enabled,

    /**
     * Generate a set of favicon icons from a single image file.
     */
    'eleventy-favicon': enabled,

    /**
     * Accessible emoji shortcode and filter. Usage:
     * {% emoji "⚙️", "settings gear" %} or {{ "⚙️" | emoji: "settings gear" }}
     */
    'eleventy-plugin-emoji': enabled,

    /**
     * Generates a nested table of contents for use in an aside from page contents
     */
    'eleventy-plugin-nesting-toc': enabled,

    /**
     * Copies PDF and video asset files to the public folder using input page directory structure
     */
    // throwing on `require` in `addEleventyPlugins` but error message swallowed
    // node-canvas doesn't work with worker threads yet:
    // https://github.com/Automattic/node-canvas/issues/1394
    // "Module did not self-register: '/home/kevin/Repos/webstackdev/eleventy.webstackbuilders.com/node_modules/canvas/build/Release/canvas.node'."
    'eleventy-plugin-page-assets': disabled,

    /**
     * Element embedded in a 'highlight' paired shortcode will bring up share options
     * on hover, and insert the quoted text and a link to the current page on click.
     * You can share it on any platform that registers as a share target. Like Medium.
     */
    'eleventy-plugin-share-highlight': disabled,

    /**
     * Adds filter for analyzing content input into the filter and returning a
     * time-to-read estimate to use in text like 'This will take 3 minutes to read'.
     */
    'eleventy-plugin-time-to-read': enabled,
  })

  /**
   * Map layouts to the nunjucks file in _layouts
   */
  eleventyConfig.addLayoutAlias('base', 'base.njk')

  /**
   * Watch compiled assets for changes. When the file or the files
   * in this directory change Eleventy will trigger a build. Files are
   * updated by Gulp and Webpack workflow when scss or js files change.
   */
  eleventyConfig.addWatchTarget(`${buildPaths.scssSourceDir}/index.css`)
  eleventyConfig.addWatchTarget(`${buildPaths.jsSourceDir}/index.js`)

  /**
   * Files to pass through to the `public` folder. Strips `input` from the path (`src` here).
   */
  // @TODO: Moving to Gulp task `build:assets`
  eleventyConfig.addPassthroughCopy('src/manifest.json')
  eleventyConfig.addPassthroughCopy('src/robots.txt')

  /**
   * Cache eleventyConfig for the addExtensions dynamic extension loader. This system loads
   * filters, shortcodes, and functions from the module exports used in `eleventy/index.js`.
   */
  eleventySetup.utils.extensionsInit(eleventyConfig, eleventySetup)

  /**
   * Add functions for use in Eleventy Javascript  *.11tydata.js directory files
   */
  eleventyConfig.addJavaScriptFunction('getPermalinkPath', eleventySetup.utils.getPermalinkPath)

  /**
   * Configured markdown-it instance, also used in markdown shortcodes
   */
  eleventyConfig.setLibrary('md', eleventySetup.markdown.setup)

  /**
   * Add a markdown renderer filter, use in *.11ty.js files as
   * 'await this.renderTemplate(`# Title`)'. Must come after setLibrary('md', _) call.
   */
  eleventyConfig.addPlugin(require('@11ty/eleventy').EleventyRenderPlugin)

  /**
   * BrowserSyncConfig configuration
   */
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      /** Use the 404 error page on dev server. This provides the redirect. */
      ready: eleventySetup.handlers.pageNotFoundHandler,
    },
    /** Add additional files to watch for HMR */
    files: ['./public/css/**/*.css', './public/js/**/*.js'],
  })

  /**
   * The options object is passed straight through to gray-matter as gray matter options
   */
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    /** default excerpt separator is '---' */
    excerpt_separator: '<!-- excerpt -->',
  })

  /**
   * Collections: Articles
   */
  eleventyConfig.addCollection('articles', function (collection) {
    return collection
      .getFilteredByGlob(`${buildPaths.articlesSourceDir}/**/*.md`)
      .filter(item => item.data.permalink !== false)
      .sort((a, b) => b.date - a.date)
  })

  /**
   * Collections: Featured Articles
   */
  eleventyConfig.addCollection('featured', function (collection) {
    return collection
      .getFilteredByGlob(`${buildPaths.articlesSourceDir}/**/*.md`)
      .filter(item => item.data.featured)
      .sort((a, b) => b.date - a.date)
  })

  /**
   * Collections: Case Studies / Work / Portfolio
   */
  eleventyConfig.addCollection('casestudies', function (collection) {
    return collection
      .getFilteredByGlob(`${buildPaths.casestudiesSourceDir}/**/*.md`)
      .filter(item => item.data.permalink !== false)
  })

  /**
   * Collections: Services (Store)
   */
  eleventyConfig.addCollection('services', function (collection) {
    return collection
      .getFilteredByGlob(`${buildPaths.servicesSourceDir}/**/*.md`)
      .filter(item => item.data.active)
  })

  /**
   * Collections: Testimonials. These do not have pages generated for them.
   */
  eleventyConfig.addCollection('testimonials', function (collection) {
    return collection
      .getFilteredByGlob(`${buildPaths.testimonialsSourceDir}/**/*.md`)
      .filter(item => item.data.active)
  })

  eleventyConfig.addCollection('sitemap', function (collection) {
    return collection.getFilteredByTags(`articles`, `case-studies`, `services`, `site`)
  })

  return {
    dir: {
      /**
       * Global data template files directory, available to all templates. This is the
       * default but included here for visibility with the other core directories.
       */
      data: '_data',

      /**
       * The top level directory/file/glob used to look for templates, such as Markdown
       * files or 11ydata.js / 11ydata.json / (subdir|markdownFilename).json files.
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
