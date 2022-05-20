/**
 * Split the content into excerpt and remainder on the excerpt separator '<!--more-->'.
 * Usage:
 *   {{ post.templateContent | excerpt | striptags }}
 *
 * @param {String} content The content that should be checked for an excerpt separator
 * @returns {String}
 */

const excerptMinimumLength = 80
const excerptSeparator = '<!-- excerpt -->'

module.exports = (content) => {
  if (!content) return
  if (content.includes(excerptSeparator)) {
      return content.substring(0, content.indexOf(excerptSeparator))
  } else if (content.length <= excerptMinimumLength) {
      return content
  }
  const excerptEnd = findExcerptEnd(content)
  return content.substring(0, excerptEnd)
}

const findExcerptEnd = (content) => {
  if (content === '') return false
  const paragraphEnd = content.indexOf('</p>', 0) + 4
  if (paragraphEnd >= excerptMinimumLength) return paragraphEnd
  return (
    paragraphEnd +
    findExcerptEnd(
      content.substring(paragraphEnd),
      paragraphEnd
    )
  )
}
