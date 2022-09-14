/**
 * Revalidator schema validation for base properties in front matter
 * https://github.com/flatiron/revalidator#schema
 */
import type { FrontmatterSchema } from '@github-docs/frontmatter'
import { slugRegex } from '../util'

export const baseSchema: FrontmatterSchema = {
  type: {
    type: `string`,
    description: `Field used by the JSON-LD schema generator plugin`,
    enum: [`page`, `post`, `product`],
    required: false,
    messages: {
      type: `The type must be one of 'page', 'post', or 'product', received %(actual)u`,
    },
  },
  title: {
    type: `string`,
    description: `The title for the page, used for page title and the <h1> heading`,
    minLength: 4, // shortest title is 'Home'
    maxLength: 80,
    required: true,
    messages: {
      minLength: `The frontmatter title is too short, the given title is only %(actual)u characters long but should be at least %(expected)u characters long`,
      maxLength: `SEO recommendation for title length is no more than 70-80 characters, the given title is %(actual)u characters long but should not be longer than %(expected)u characters long`,
      required: `A title set in frontmatter for the page is required, e.g. 'title: "Hello World"'`,
    },
  },
  description: {
    type: `string`,
    description: `A long description for the page, for use when the description doesn't make sense as a continuation in main content using the <!-- excerpt --> separator`,
    required: false,
    messages: {
      type: `The page description must be a string, received %(actual)u`,
    },
  },
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

export default baseSchema
