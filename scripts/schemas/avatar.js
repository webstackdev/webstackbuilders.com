/**
 * Revalidator schema validation for media properties in front matter
 * https://github.com/flatiron/revalidator#schema
 */
// @TODO: Double-check the avatar image handling code in AsyncImageHandler to make sure
//        it's pulling the avatar from the right place (assets folder, not the content folder)
exports.avatarSchema = {
  avatar: {
    type: `string`,
    description: `File path to an avatar image to use, for example in author profile or testimonials`,
    messages: {
      type: `The option to set an avatar file name should be set to a string e.g. 'avatar: tom-thumb.webp', received '%(actual)s'`,
    },
  },
}
