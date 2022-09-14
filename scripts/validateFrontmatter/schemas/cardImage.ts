/**
 * Revalidator schema validation for media properties in front matter
 * https://github.com/flatiron/revalidator#schema
 */
import type { FrontmatterSchema } from '@github-docs/frontmatter'

const cardImageSchema: FrontmatterSchema = {
  cardImage: {
    type: `string`,
    description: `A smaller card image file name to use on list views and social media.`,
    default: undefined,
    messages: {
      type: `The cardImage option to set a cover photo file name should be set to a string e.g. 'cardImage: extra.jpg', received '%(actual)s'`,
    },
  },
}

export default cardImageSchema
