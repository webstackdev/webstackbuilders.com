/**
 * Revalidator schema validation for 'slug' key in front matter
 * https://github.com/flatiron/revalidator#schema
 */
const { slugRegex } = require(`../util`)

exports.slugSchema = {
  slug: {
    type: `string`,
    description: `a sluggified URL identifier for use in the page route`,
    pattern: slugRegex,
    required: false,
    messages: {
      pattern: `The slug given is not a valid URL identifier, received %(actual)j`,
    },
  },
}
