const markdownIt = require('markdown-it')
const markdownAnchor = require('markdown-it-anchor')
const markdownEmoji = require('markdown-it-emoji')

const normaliseTitleAnchors = value => {
  const result = value.replace(/-/g, ' ')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

const slugifyTitleAnchors = value => {
  return encodeURIComponent(
    'h-' + String(value)
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/&/g, '-and-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .replace(/[.,\/#!$%\^\*;:{}=_`~()]/g, '')
  )
}

/**
 * Markdown Configuration, here so that the built markdown-it instance can be used in markdown shortcodes
 */
exports.markdownLib = markdownIt({
  html: true,
  breaks: true,
  typographer: true
  //linkify: true,
})
  .use(markdownAnchor, {
    level: [1, 2, 3],
    permalink: true,
    permalinkAttrs: slug => ({
      //'aria-hidden': true TODO: should this be aria-hidden?
      'aria-label': normaliseTitleAnchors(slug),
    }),
    permalinkBefore: true,
    permalinkClass: 'heading-anchor',
    permalinkSymbol: '#',
    slugify: slugifyTitleAnchors,
  })
  .use(markdownEmoji)
