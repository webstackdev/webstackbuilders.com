const htmlmin = require('html-minifier')

/**
 * Minify HTML Transformer. Example code from 11ty docs.
 */
// @TODO: rationalize where we're minifying HTML, through 11ty or Webpack
exports.htmlMinifyTransformer = (content, outputPath) => {
  if (outputPath.endsWith('.html')) {
    const minified = htmlmin.minify(content, {
      collapseInlineTagWhitespace: false,
      collapseWhitespace: true,
      removeComments: true,
      sortClassName: true,
      useShortDoctype: true,
    })
    return minified
  }
  return content
}
