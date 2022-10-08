/**
 * Programmatically add Eleventy plugins using config API so the
 * .eleventy.js config file can be kept short and informative
 */
const { getBaseURL } = require('../../eleventy/utils/url')
const buildPaths = require('../../scripts/build/paths')

const disabled = false
exports.disabled = disabled

const enabled = true
exports.enabled = enabled

const pluginOptions = {
  /**
   * Set navigation in frontmatter under 'eleventyNavigation' item with 'tag' and
   * optional 'parent' elements, generates navigation and breadcrumbs from shortcode
   * in Nunjucks or Liquid templates.
   */
  '@11ty/eleventy-navigation': undefined,

  /**
   * Group and sort Eleventy CLI verbose build output by directory with file size and benchmarks
   */
  '@11ty/eleventy-plugin-directory-output': {
    columns: {
      filesize: true, // Show file size in output
      benchmark: true, // Show benchmark in output
    },
    // Show in yellow if greater than this number of bytes
    warningFileSize: 400 * 1000,
  },

  /**
   * Outputs command line warnings for weasel words like "obviously", "basically", etc.
   */
  '@11ty/eleventy-plugin-inclusive-language': {
    templateFormats: ['md', 'njk'], // default is 'md'
    words: 'simply,obviously,basically,of course,clearly,just,everyone knows,however,easy',
  },

  /**
   * RSS feed generator, adds shortcode filters absoluteUrl, dateToRfc3339, dateToRfc822.
   */
  '@11ty/eleventy-plugin-rss': undefined,

  /**
   * Generates images as headers for use in social shares
   */
  '@11tyrocks/eleventy-plugin-social-images': undefined,

  /**
   * Provides a shortcode to generate a JSON-LD script per-page including the <script> tag.
   */
  '@quasibit/eleventy-plugin-schema': undefined,

  /**
   * Provides a shortcode to generate a sitemap.xml file using _generate/sitemap.njk
   */
  '@quasibit/eleventy-plugin-sitemap': {
    /**
     * Name of the property for the last modification date. By default it is undefined
     * and the plugin will fallback to `date`. When set, the plugin will try to use
     * this property and it will fallback to the `date` property when needed.
     */
    lastModifiedProperty: 'modified',
    /**
     * Options for SitemapStream. Hostname is needed when the URLs of the
     * items do not include it.
     */
    sitemap: {
      hostname: getBaseURL(),
    },
  },

  /**
   * Adds `target="_blank" rel="noreferrer"` to all external links
   */
  '@sardine/eleventy-plugin-external-links': undefined,

  /**
   * Generate a set of favicon icons from a single image file.
   */
  'eleventy-favicon': {
    /** The build directory and where the icon files will be copied over to */
    destination: buildPaths.imagesBuildDir,
  },

  /**
   * Accessible emoji shortcode and filter. Usage:
   * {% emoji "⚙️", "settings gear" %} or {{ "⚙️" | emoji: "settings gear" }}
   */
  'eleventy-plugin-emoji': {
    className: 'emoji',
  },

  /**
   * Generates a nested table of contents for use in an aside from page contents
   */
  'eleventy-plugin-nesting-toc': undefined,

  /**
   * Copies PDF and video asset files to the public folder using input page directory structure
   */
  'eleventy-plugin-page-assets': {
    /** glob to match which assets are going to be resolved */
    assetsMatching: '*.pdf|*.mp4|*.webm|*.avi',
    /**
     * Rewrite filenames to hashes and flatten paths to always be next to the post .html file
     */
    hashAssets: false,
    /**
     * Parse mode resolves assets included from templates. Directory mode blindly
     * copies files in the folder whether or not they are used in a template.
     */
    mode: 'parse',
    /** glob for filtering which templates to process */
    postsMatching: 'src/pages/*/*.md',
    /** Recursively scan assets in subdirectories when in directory mode */
    recursive: false,
  },

  /**
   * Element embedded in a 'highlight' paired shortcode will bring up share options
   * on hover, and insert the quoted text and a link to the current page on click.
   * You can share it on any platform that registers as a share target. Like Medium.
   */
  'eleventy-plugin-share-highlight': {
    /** Tooltip label text for shares */
    label: 'Share this',
  },

  /**
   * Adds filter for analyzing content input into the filter and returning a
   * time-to-read estimate to use in text like 'This will take 3 minutes to read'.
   */
  'eleventy-plugin-time-to-read': {
    speed: '200 words per minute',
    /** 'long': 3 minutes and 10 seconds, 'short': 3 min & 10 sec, 'narrow': 3m, 10s */
    style: 'narrow',
    /** Which time units to render */
    hours: false,
    minutes: true,
    seconds: false,
    /**
     * Format returned string
     *
     * @param {object} data - An object with various keys, see docs
     * @returns {string} Returns the formatted string to return from time-to-read shortcode
     */
    output: function (data) {
      return data.timing
    },
  },
}

/**
 * @param { import('../../@types/eleventyConfig').Config } eleventyConfig - config API from 11ty
 * @param {object} pluginSettings - a list of plugin names and whether they are enabled or disabled
 */
exports.addEleventyPlugins = (eleventyConfig, pluginSettings) => {
  Object.keys(pluginSettings).forEach(pluginName => {
    /** Check that options in config file and here are in sync */
    if (pluginName in pluginOptions === false)
      throw new Error(
        `Plugin name '${pluginName}' in .eleventy.js file plugin settings is not in the plugins options. Did you forget to add it to eleventy/config/plugins.js?`
      )
    /** Make sure the plugin is enabled in the eleventy config file */
    /* eslint-disable-next-line security/detect-object-injection */
    if (pluginSettings[pluginName] === disabled) return
    /** Load and add the plugin */
    /* eslint-disable-next-line security/detect-non-literal-require */
    const plugin = require(`${pluginName}`)
    /* eslint-disable-next-line security/detect-object-injection */
    if (pluginOptions[pluginName]) {
      /* eslint-disable-next-line security/detect-object-injection */
      eleventyConfig.addPlugin(plugin, pluginOptions[pluginName])
    } else {
      eleventyConfig.addPlugin(plugin)
    }
  })
}
