/**
 * Front matter schema Revalidator validation for Eleventy Navigation Plugin
 * https://github.com/flatiron/revalidator#schema
 */
const { slugRegex } = require(`../util`)

/**
 * If the 'parent' key is set in any page's front matter, the rendered navigation
 * schema will have a 'children' property along with 'key' and optionally 'title'
 * or 'url' properties. The 'children' property will be an array of navigation objects.
 */
exports.navigationSchema = {
  eleventyNavigation: {
    type: 'object',
    required: false,
    properties: {
      key: {
        type: 'string',
        description: `A unique sluggified URL page route to use in navigation links. Over-ridden by 'url' key if it's set in client code.`,
        pattern: slugRegex,
        required: true,
        messages: {
          pattern: `The slug given for the navigation key is not a valid URL identifier, received %(actual)j`,
        },
      },
      parent: {
        type: 'string',
        description: `Nest a link inside of another link by setting the parent key to another link key. Links that do not have parent will be assumed to be at the top level.`,
        pattern: slugRegex,
        required: false,
        messages: {
          pattern: `The slug given for the navigation key parent is not a valid URL identifier, received %(actual)j`,
        },
      },
      title: {
        type: 'string',
        description: `Alternative text to use in navigation links, overrides key name if set.`,
        minLength: 5,
        maxLength: 60,
        messages: {
          minLength: `The navigation link title is too short, the given title is only %(actual)u characters long but should be at least %(expected)u characters long`,
          maxLength: `The navigation link is too long, the given title is %(actual)u characters long but should not be longer than %(expected)u characters long`,
          required: `A navigation link title set in frontmatter for the page is required if navigation is used, e.g. 'title: "Case Studies"'`,
        },
      },
      excerpt: {
        type: 'string',
        description: `Additional descriptive text about the link for use in e.g. hero menus.`,
        required: false,
        messages: {
          type: `The excerpt text must be a string, given is %(actual)u`,
        },
      },
      order: {
        type: 'integer',
        description: `The order in the menu to display this page as a navigation link, can be an arbitrary number.`,
        default: 0,
        messages: {
          type: `The navigation link order must be an integer, %(actual)u received`,
          required: `A navigation link title set in frontmatter for the page is required if navigation is used, e.g. 'order: 2'`,
        },
      },
      url: {
        type: 'string',
        description: `Allows adding a link to an external URL. Set 'permalink: false' to avoid generating a page for the template that the 'url' property is set on since it's an extenral link.`,
        format: 'url',
        required: false,
        messages: {
          type: `A navigation link URL must be a string, %(actual)u received`,
          format: `The navigation link URL set in frontmatter for the page is an invalid URL, %(actual)u received`,
        },
      },
    },
  },
}
