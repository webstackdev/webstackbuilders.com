/**
 * Filters to specify for use in .eleventy.js with `addFilter`
 */
const { DateTime } = require('luxon')
const slugifyLib = require('slugify')

// local imports
const excerpt = require('./excerpt')
const squash = require('./squash')

module.exports = {
  /**
   * Usage:
   *   {%- set currentPage = collections.all | currentPage(page) -%}
   *   {%- set autoDescription = currentPage.templateContent | excerpt | safe | striptags -%}
   */
  currentPage: function (allPages, currentPage) {
    const matches = allPages.filter(
      (page) => page.inputPath === currentPage.inputPath
    )
    if (matches && matches.length) {
      return matches[0]
    }
    return null
  },

  /**
   * Usage:
   *   {{ build.timestamp | dateToFormat('yyyy') }}
   */
  dateToFormat: function (date, format) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(
      String(format)
    )
  },

  /**
   * Usage:
   *   <time dateTime="{{ post.date | dateToISO }}">{ post.date | readableDate }</time>
   */
  dateToISO: function (date) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
      includeOffset: false,
      suppressMilliseconds: true
    })
  },

  /**
   * Usage:
   *   {{ webmention.published | dateFromISO | readableDate("dd LLL yyyy") }}
   */
  dateFromISO: function (timestamp) {
    return DateTime.fromISO(timestamp, { zone: 'utc' }).toJSDate()
  },

  /**
   * Split the content into excerpt and remainder based on the split delimeter '\n<!--more-->\n'.
   * Usage:
   *   {{ post.templateContent | excerpt | safe | striptags }}
   */
  excerpt,

  /**
   * Example using Liquid templating engine:
   *   {% assign taggers = tip.data.tags | exclude: "tips" %}
   */
  exclude: function (values, itemToExclude) {
    return values.filter(value => value !== itemToExclude)
  },

  /**
   * Usage:
   *   {% set otherposts = collections.posts | excludeItemFromCollection(page) | slice(-10) %}
   */
  excludeItemFromCollection: function (collection, itemToExclude) {
    return collection.filter(
      (item) => item.inputPath !== itemToExclude.inputPath
    )
  },

  /**
   * Find item in associative array by key. Usage:
   *   {%- set dark = themes|findById('dark') -%}
   */
  findById: function (array, id) {
    return array.find((i) => i.id === id)
  },

  /**
   * Print high numbers as "11K" for thousands. Usage:
   *   {{ likeCount | humanizeNumber }}
   */
  humanizeNumber: function (num) {
    if (num > 999) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    return num
  },

  /**
   * Usage:
   *   <a href="mailto:{{ author.email | obfuscate | safe }}">
   *     {{ author.email | obfuscate | safe }}
   *   </a>
   */
  obfuscate: function (str) {
    const chars = []
    for (var i = str.length - 1; i >= 0; i--) {
      chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''))
    }
    return chars.join('')
  },


  /**
   * Friendly date filter. Supported tokens:
   * https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
   * Usage:
   *   {{ date | readableDate('dd LLL yyyy') }}
   */
  readableDate: function (date, format) {
    const datetimeObj = DateTime.fromJSDate(date, { zone: 'utc' })
    if (!format) {
      format = datetimeObj.hour + datetimeObj.minute > 0 ? 'dd LLL yyyy - HH:mm' : 'dd LLL yyyy'
    }
    return datetimeObj.toFormat(format)
  },

  /**
   * Sets or changes the extension on media files. Usage:
   *   {{ imgsrc | setExt('webp') }}
   */
  setExt: function (path, ext) {
    if (!ext) return path
    return path.substr(0, path.lastIndexOf('.')) + `.${ext}`
  },

  /**
   * Usage:
   *   {% set otherposts = collections.posts | excludePost(page) | slice(-10) %}
   */
  slice: function (array, start, end) {
      return end ? array.slice(start, end) : array.slice(start)
  },

  /**
   *  11ty has a built-in `slugify` filter
   */
  // @TODO: refactor slugify to slugifyTitleAnchors in eleventy/library/markdown
  slugify: function (str) {
    if (!str) return

    return slugifyLib(str, {
      lower: true,
      strict: true,
      remove: /["]/g,
    })
  },

  /**
   * Make a search index string by removing duplicated words and less useful, common short words
   */
  squash,

  /**
   * Example using Liquid templating engine:
   *   {% assign category = collections.categories | withCategory: "articles" %}
   */
  withCategory: function (values, category) {
    return values.find(value => value.data.key === category)
  },
}
