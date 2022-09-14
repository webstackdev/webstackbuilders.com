/// <reference path="../../../@types/@github-docs/frontmatter.d.ts" />
/**
 * Revalidator schema validation for 'slug' key in front matter
 * https://github.com/flatiron/revalidator#schema
 */
import type { FrontmatterSchema } from '@github-docs/frontmatter'
import { slugRegex } from '../util'

const slugSchema: FrontmatterSchema = {
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

export default slugSchema
