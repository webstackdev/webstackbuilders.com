/**
 * Revalidator schema validation for media properties in front matter
 * https://github.com/flatiron/revalidator#schema
 */
import type { FrontmatterSchema } from '@github-docs/frontmatter'

const coverImageSchema: FrontmatterSchema = {
  image: {
    type: `string`,
    description: `The cover photo file name to show in the hero header section of an article.`,
    default: `cover.jpg`,
    messages: {
      type: `The image option to set a cover photo file name should be set to a string e.g. 'image: cover.jpg', received '%(actual)s'`,
    },
  },
}

export default coverImageSchema
