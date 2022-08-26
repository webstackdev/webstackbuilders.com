/**
 * Revalidator schema validation for 'name' key in front matter
 * https://github.com/flatiron/revalidator#schema
 */
exports.nameSchema = {
  name: {
    type: `string`,
    description: `An individuals name, for example an author or used in a testimonial`,
    required: false,
    messages: {
      type: `The name given is not a strong, received %(actual)j`,
    },
  },
}
