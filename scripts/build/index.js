/**
 * Extract and inline critical CSS in HTML document head styles
 */
const criticalCss = require('./criticalCss')
exports.criticalCss = criticalCss

/**
 * Minify HTML Transformer. Example code from 11ty docs.
 */
const htmlMinifyTransformer = require('./htmlMinifyTransformer')
exports.htmlMinifyTransformer = htmlMinifyTransformer
