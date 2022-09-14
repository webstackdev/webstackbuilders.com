/**
 * Revalidator schema validation for an 'organization' key in front matter
 * https://github.com/flatiron/revalidator#schema
 */
import type { FrontmatterSchema } from '@github-docs/frontmatter'

const organizationSchema: FrontmatterSchema = {
  organization: {
    type: `string`,
    description: `The name of an organization, for use in testimonials and case studies`,
    required: false,
    messages: {
      type: `The organization given is not a string, received %(actual)j`,
    },
  },
}

export default organizationSchema
