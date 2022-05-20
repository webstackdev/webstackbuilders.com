/**
 * Usage in a Markdown file:
 * {% tag %}This contains some [**Markdown**](https://www.11ty.dev/docs/languages/markdown/){% endtag %}
 */
const { markdownLib } = require('../library')
const outdent = require('outdent')

exports.customMarkdownShortcode = children => {
  const content = markdownLib.render(children)
  return outdent.string(`<div>${content}</div>`)
}
