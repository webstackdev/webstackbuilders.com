/**
 * Revalidator schema validation texting fixture for front matter properties
 * https://github.com/flatiron/revalidator#schema
 */
import type { FrontmatterSchema } from '@github-docs/frontmatter'

const testing3Schema: FrontmatterSchema = {
  fourth: {
    type: `string`,
    description: `The fourth property`,
  },
}

export default testing3Schema
