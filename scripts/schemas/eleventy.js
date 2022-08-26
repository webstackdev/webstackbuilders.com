/**
 * Front matter schema Revalidator validation for special
 * data keys defined by Eleventy in their documentation.
 * https://github.com/flatiron/revalidator#schema
 */
const validTags = require(`../../src/_data/tags`)
const { isStringInArray } = require(`../util`)

const permalinkRegex = /^\/|(\/[\w-]+)+$/

exports.eleventySchema = {
  date: {
    type: `object`,
    description: `Override the default file creation date to customize how the file is sorted in a collection.`,
    required: false,
    messages: {
      type: `The date given is not in YYYY-MM-DD format`,
      required: `A date set in frontmatter for the page is required, e.g. 'date: 2021-03-31'`,
    },
  },
  /** Not sure if adding tags in Markdown file appends to tags or replaces it */
  tags: {
    type: [`string`],
    conform: tags => isStringInArray(tags, validTags),
    description: `An array of tag names that identifies that a piece of content is part of a collection. Collections can be reused in any other template`,
    required: false,
    default: `article`,
    messages: {
      type: `The tags given are not an array of strings, received %(actual)s`,
      conform: `The tags given are not in the list of valid tags (src/_data/tags.js), received %(actual)s`,
    },
  },
  layout: {
    enum: [`article`, `base`, `page`],
    type: `string`,
    description: `Wrap current template with a layout template found in the _layouts folder.`,
    required: false,
    default: `article`,
    messages: {
      enum: `The 'layout' option set in front matter is not a valid value, received '%(actual)s' and layout should be one of 'article', 'base', or 'page'`,
    },
  },
  permalink: {
    type: `string`,
    description: `Change the output target of the current template. Normally, you cannot use template syntax to reference other variables in your data, but permalink is an exception.`,
    pattern: permalinkRegex,
    maxLength: 2000,
    required: false,
    messages: {
      pattern: `The 'permalink' option set in front matter is not a valid relative path, e.g.: 'permalink: /articles/hello-world/' received '%(actual)s'`,
    },
  },
  eleventyExcludeFromCollections: {
    type: `boolean`,
    description: `Set to true to exclude this content from any and all Collections, e.g. those tagged in data or setup using the Configuration API.`,
    default: false,
    messages: {
      type: `The eleventyExcludeFromCollections option should be set to boolean 'true' or 'false', received '%(actual)s'`,
    },
  },
  templateEngineOverride: {
    type: [`string`],
    enum: ['liquid', 'md', 'njk'],
    description: `Override the template engine on a per-file basis, usually configured with a file extension or globally using the markdownTemplateEngine and htmlTemplateEngine configuration options.`,
    required: false,
    messages: {
      type: `The templateEngineOverride option should be set to one of 'liquid', 'md', or 'njk', received '%(actual)s'`,
    },
  },
  eleventyComputed: {
    type: `object`,
    description: `Programmatically set data values based on other values in the data cascade.`,
    required: false,
    messages: {
      type: `The eleventyComputed option should be a function, received '%(actual)s'`,
    },
  },
}
