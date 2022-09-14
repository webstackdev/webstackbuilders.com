/**
 * Revalidator schema validation texting fixture for front matter properties
 * https://github.com/flatiron/revalidator#schema
 */
import type { FrontmatterSchema } from '@github-docs/frontmatter'

const testing2Schema: FrontmatterSchema = {
  third: {
    type: `string`,
    description: `The third property`,
  },
}

export default testing2Schema
