/**
 * Allows using Markdown inside tags in a Nunjucks or other template file
 *
 * Usage in a Markdown file:
 * {% tag %}This contains some [**Markdown**](https://www.11ty.dev/docs/languages/markdown/){% endtag %}
 */
const { markdownLib } = require('../markdown')
const outdent = require('outdent')

exports.customMarkdownShortcode = (_, children) => {
  const content = markdownLib.render(children)
  return outdent.string(`<div>${content}</div>`)
}
