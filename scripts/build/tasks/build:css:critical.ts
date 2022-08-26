const path = require('path')
const critical = require('critical')

module.exports = function (config, options) {
  config.addTransform('critical-css', async function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      // Config will change from Eleventy v1.0.0
      const outputDir =
        (this._config && this._config.dir && this._config.dir.output) ||
        (config && config.dir && config.dir.output) ||
        path.dirname(outputPath)

      // Generate HTML with critical CSS
      const { html } = await critical.generate({
        assetPaths: [path.dirname(outputPath)],
        base: outputDir,
        html: content,
        inline: true,
        rebase: ({ originalUrl }) => originalUrl,
        ...options,
      })

      return html
    }

    return content
  })
}

const criticalConfig = {
  /**
   * Base directory in which the source and destination are to be written.
   *
   * @default path.dirname(src) || process.cwd()
   */
  base: 'dist/',

  /**
   * An array of paths to css files, file globs or Vinyl file objects.
   *
   * @default []
   */
  css: ['dist/styles/main.css'],

  /**
   * Remove the inlined styles from any stylesheets referenced in the HTML.
   * It generates new references based on extracted content so it's safe to
   * use for multiple HTML files referencing the same stylesheet. Use with
   * caution. Removing the critical CSS per page results in a unique async
   * loaded CSS file for every page. Meaning you can't rely on cache across
   * multiple pages
   *
   * @default false
   */
  extract: true,

  /**
   * HTML source. Takes precedence over the `src` option.
   */
  html: '<html>...</html>',

  /**
   * CSS rules to ignore.
   *
   * @default undefined
   */
  ignore: {
    //atrule: ['@font-face'],
    //rule: [/some-regexp/],
    //decl: (node, value) => /big-image\.png/.test(value),
  },

  /**
   * Inline the generated critical-path CSS using filamentgroup's loadCSS.
   * Boolean `true` generates HTML, `false` generates CSS. Pass an object
   * to configure inline-critical.
   *
   * @default false
   */
  inline: true,

  /**
   * Inline images
   *
   * @default false
   */
  inlineImages: false,

  /**
   * Sets a max file size (in bytes) for base64 inlined images
   *
   * @default 10240
   */
  maxImageFileSize: 10240,

  /**
   * Viewport height
   */
  height: 900,

  /**
   * Viewport width
   */
  width: 1300,

  /**
   * An array of objects containing height and width. Takes precedence
   * over width and height if set.
   *
   * @default []
   */
  dimensions: [],

  /**
   * Configuration options for Penthouse critical path css generator.
   * Many Critical options are passed directly to Penthouse. Has `forceInclude`
   * option, an array of css selectors to keep in critical css, even
   * if not appearing in critical viewport. Strings or regex. Useful
   * for HTML that varies based on things such as the logged in user
   * or third party advertising.
   * https://github.com/pocketjoso/penthouse
   *
   * @default {}
   */
  penthouse: {},

  /**
   * Critical tries it's best to rebase the asset paths relative to the
   * document. If this doesn't work as expected you can always use this
   * option to control the rebase paths. See postcss-url for details:
   * https://github.com/pocketjoso/penthouse#usage-1.
   *
   * @default undefined
   */
  rebase: undefined,

  /**
   * Location of the HTML source to be operated against.
   */
  src: 'index.html',

  /**
   * Location of where to save the output of an operation. Use an object
   * with `html` and `css` props if you want to store both.
   */
  target: {
    css: 'critical.css',
    html: 'index-critical.html',
    uncritical: 'uncritical.css',
  },
}
