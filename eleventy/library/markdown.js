const markdownIt = require('markdown-it')
const markdownAnchor = require('markdown-it-anchor')
const markdownEmoji = require('markdown-it-emoji')

const { slugify } = require('../filters')

/**
 * Markdown Configuration, here so that the built markdown-it instance can be used in markdown shortcodes
 */
exports.markdownLib = markdownIt({
  html: true,
  //breaks: true,
  //linkify: true,
})
  .use(markdownAnchor, {
    level: [1, 2, 3],
    permalink: markdownAnchor.permalink.ariaHidden({
      class: 'tdbc-anchor',
      space: false,
    }), // could also be `true` and use keys:
    //permalinkBefore: true,
    //permalinkClass: 'title-anchor',
    //permalinkSymbol: '',
    //permalinkAttrs: slug => ({ 'aria-label': normaliseTitleAnchors(slug) }),
    slugify,
    //slugify: slugifyTitleAnchors,
  })
  .use(markdownEmoji)

const normaliseTitleAnchors = value => {
  const result = value.replace(/-/g, ' ')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

// @TODO: refactor slugify in filters
const slugifyTitleAnchors = value => {
  return encodeURIComponent(
    String(value)
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/&/g, '-and-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  )
}
