/**
 * Filters to specify for use in .eleventy.js with `addFilter`
 */

/**
 * Gets the full data for the current page from collections using the page's path as a key
 */
const { currentPage } = require('./collections')
exports.currentPage = currentPage

/**
 * Usage:
 *   {{ build.timestamp | dateToFormat('yyyy') }}
 * Friday, July 15, 2022 at 11:39:50 PM GMT+3
 */
const { dateToFormat } = require('./date')
exports.dateToFormat = dateToFormat

/**
 * Usage:
 *   <time dateTime="{{ post.date | dateToISO }}">{ post.date | readableDate }</time>
 */
const { dateToISO } = require('./date')
exports.dateToISO = dateToISO

/**
 * Usage:
 *   {{ webmention.published | dateFromISO | readableDate("dd LLL yyyy") }}
 */
const { dateFromISO } = require('./date')
exports.dateFromISO = dateFromISO

/**
 * Indents an element by set width of spaces to help prettify template
 * output when partials are deeply included. Whitespace is stripped out
 * in production by minification, this is for developer experience only.
 * Usage in Nunjucks template:
 * {% filter indent(6, true) %}{% include "./something.njk" %}{% endfilter %}
 */
const { indentElement } = require('./indentElement')
exports.indentElement = indentElement

/**
 * Example using Liquid templating engine:
 *   {% assign taggers = tip.data.tags | exclude: "tips" %}
 */
const { exclude } = require('./collections')
exports.exclude = exclude

/**
 * Usage:
 *   {% set otherposts = collections.posts | excludeItemFromCollection(page) | slice(-10) %}
 */
const { excludeItemFromCollection } = require('./collections')
exports.excludeItemFromCollection = excludeItemFromCollection

/**
 * Find item in associative array by key. Usage:
 *   {%- set dark = themes|findById('dark') -%}
 */
const { findById } = require('./collections')
exports.findById = findById

/**
 * Friendly date filter. Supported tokens:
 * https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
 * Usage:
 *   {{ date | readableDate('dd LLL yyyy') }}
 */
const { readableDate } = require('./date')
exports.readableDate = readableDate

/**
 * Print high numbers as "11K" for thousands. Usage:
 *   {{ likeCount | humanizeNumber }}
 */
const { humanizeNumber } = require('./format')
exports.humanizeNumber = humanizeNumber

/**
 * Usage:
 *   <a href="mailto:{{ author.email | obfuscate | safe }}">
 *     {{ author.email | obfuscate | safe }}
 *   </a>
 */
const { obfuscate } = require('./format')
exports.obfuscate = obfuscate

/**
 * Sets or changes the extension on media files. Usage:
 *   {{ imgsrc | setExt('webp') }}
 */
const { setExt } = require('./format')
exports.setExt = setExt

/**
 * Usage:
 *   {% set otherposts = collections.posts | excludePost(page) | slice(-10) %}
 */
const { slice } = require('./collections')
exports.slice = slice

/**
 *  11ty has a built-in `slugify` filter
 */
const { slugify } = require('./format')
exports.slugify = slugify

/**
 * Example using Liquid templating engine:
 *   {% assign category = collections.categories | withCategory: "articles" %}
 */
const { withCategory } = require('./collections')
exports.withCategory = withCategory
