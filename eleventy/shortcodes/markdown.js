/**
 * Usage in a Markdown file:
 * {% tag %}This contains some [**Markdown**](https://www.11ty.dev/docs/languages/markdown/){% endtag %}
 */
const outdent = require('outdent')
const { markdownLib } = require('../library')

exports.customMarkdownShortcode = children => {
  const content = markdownLib.render(children)
  return outdent`<div>${content}</div>`
}
