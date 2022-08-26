/**
 * Revalidator schema validation for an 'organization' key in front matter
 * https://github.com/flatiron/revalidator#schema
 */
exports.organizationSchema = {
  organization: {
    type: `string`,
    description: `The name of an organization, for use in testimonials and case studies`,
    required: false,
    messages: {
      type: `The organization given is not a string, received %(actual)j`,
    },
  },
}
