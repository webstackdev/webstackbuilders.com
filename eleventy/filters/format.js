const slugifyLib = require('slugify')

/**
 * Print high numbers as "11K" for thousands. Usage:
 *   {{ likeCount | humanizeNumber }}
 */
exports.humanizeNumber = num => {
  if (num > 999) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return num
}

/**
 * Usage:
 *   <a href="mailto:{{ author.email | obfuscate | safe }}">
 *     {{ author.email | obfuscate | safe }}
 *   </a>
 */
exports.obfuscate = str => {
  const chars = []
  for (var i = str.length - 1; i >= 0; i--) {
    chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''))
  }
  return chars.join('')
}

/**
 * Sets or changes the extension on media files. Usage:
 *   {{ imgsrc | setExt('webp') }}
 */
exports.setExt = (path, ext) => {
  if (!ext) return path
  return path.substr(0, path.lastIndexOf('.')) + `.${ext}`
}

/**
 *  11ty has a built-in `slugify` filter
 */
// @TODO: refactor slugify to slugifyTitleAnchors in eleventy/library/markdown
exports.slugify = str => {
  if (!str) return

  return slugifyLib(str, {
    lower: true,
    strict: true,
    remove: /["]/g,
  })
}
