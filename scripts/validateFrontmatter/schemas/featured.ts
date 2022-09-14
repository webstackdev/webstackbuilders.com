/**
 * Revalidator schema validation for 'featured' flag in front matter
 * https://github.com/flatiron/revalidator#schema
 */
import type { FrontmatterSchema } from '@github-docs/frontmatter'

const featuredSchema: FrontmatterSchema = {
  featured: {
    type: `boolean`,
    description: `Whether the article should be displayed differently as featured articles.`,
    default: false,
    messages: {
      type: `The featured article option should be set to boolean 'true' or 'false', received '%(actual)s'`,
    },
  },
}

export default featuredSchema
