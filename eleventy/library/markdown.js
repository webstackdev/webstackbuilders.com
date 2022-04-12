const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItEmoji = require('markdown-it-emoji')

const { slugify } = require('../filters')

/**
 * Markdown Configuration, here so that the built markdown-it instance can be used in markdown shortcodes
 */
exports.markdownLib = markdownIt({
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
