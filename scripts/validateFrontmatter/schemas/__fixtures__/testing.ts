/**
 * Revalidator schema validation texting fixture for front matter properties
 * https://github.com/flatiron/revalidator#schema
 */
import type { FrontmatterSchema } from '@github-docs/frontmatter'

const testingSchema: FrontmatterSchema = {
  first: {
    type: `string`,
    description: `The first property`,
  },
  second: {
    type: `string`,
    description: `The second property`,
  },
}

export default testingSchema
