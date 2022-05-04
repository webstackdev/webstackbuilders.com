/**
 *
 */
const htmlmin = require('html-minifier')

exports.minify = (content) => htmlmin.minify(content, {
  removeComments: true,
  collapseWhitespace: true
})
