/**
 * Revalidator schema validation for media properties in front matter
 * https://github.com/flatiron/revalidator#schema
 */
import type { FrontmatterSchema } from '@github-docs/frontmatter'

const avatarSchema: FrontmatterSchema = {
  avatar: {
    type: `string`,
    description: `File path to an avatar image to use, for example in author profile or testimonials`,
    messages: {
      type: `The option to set an avatar file name should be set to a string e.g. 'avatar: tom-thumb.webp', received '%(actual)s'`,
    },
  },
}

export default avatarSchema
