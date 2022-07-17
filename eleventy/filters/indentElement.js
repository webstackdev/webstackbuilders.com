/**
 * Indents an element by set width of spaces to help prettify template
 * output when partials are deeply included. Whitespace is stripped out
 * in production by minification, this is for developer experience only.
 * Usage in Nunjucks template:
 * {% filter indent(6, true) %}{% include "./something.njk" %}{% endfilter %}
 */
const normalize = (value, defaultValue) => {
  if (value === null || value === undefined || value === false) {
    return defaultValue
  }
  return value
}

const repeat = (char_, n) => {
  var str = ''
  for (let i = 0; i < n; i++) {
    str += char_
  }
  return str
}
const copySafeness = (dest, target) => {
  if (dest instanceof SafeString) {
    return new SafeString(target)
  }
  return target.toString()
}

exports.indentElement = (str, width, indentfirst) => {
  str = normalize(str, '')

  if (str === '') {
    return ''
  }

  width = width || 4
  // let res = '';
  const lines = str.split('\n')
  const sp = repeat(' ', width)

  const res = lines
    .map((l, i) => {
      return i === 0 && !indentfirst ? l : `${sp}${l}`
    })
    .join('\n')

  return copySafeness(str, res)
}
