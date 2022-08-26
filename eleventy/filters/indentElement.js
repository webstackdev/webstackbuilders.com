/**
 * Indents an element by set width of spaces to help prettify template
 * output when partials are deeply included. Whitespace is stripped out
 * in production by minification, this is for developer experience only.
 * Usage in Nunjucks template:
 * {% filter indent(6, true) %}{% include "./something.njk" %}{% endfilter %}
 *
 * @param _
 * @param str
 * @param width
 * @param indentfirst
 */
exports.indentElement = (_, str, width = 2, indentfirst = true) => {
  if (!str) return ''
  return str
    .split('\n')
    .map((line, i) => {
      return i === 0 && !indentfirst ? line : line.padStart(line.length + width, ' ')
    })
    .join('\n')
}
