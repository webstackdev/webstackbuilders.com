/**
 * Allows using Markdown inside a paired shortcode in a Nunjucks or other template file
 *
 * Usage in a Markdown file:
 * {% customMarkdownShortcode %}This contains some [**Markdown**](https://www.11ty.dev/docs/languages/markdown/){% endcustomMarkdownShortcode %}
 */
const { markdownLib } = require('../markdown')
const outdent = require('outdent')

// @TODO: Is this maybe async?
exports.customMarkdownShortcode = (_, children) => {
  const content = markdownLib.render(children)
  return outdent.string(`<div>${content}</div>`)
}
