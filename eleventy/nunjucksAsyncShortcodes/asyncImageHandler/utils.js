const path = require('path')
const nunjucks = require('nunjucks')

/**
 * Eleventy image plugin fails when alt property isn't set so add better error description
 *
 * @param {string} alt - text describing the image
 * @param {string} src - the path to the image file in the build output directory for the link
 * @returns {boolean} - whether the alt tag is set
 */
exports.checkForAltMetadata = (alt, src) => {
  if (!alt) {
    throw new Error(`Missing \`alt\` on property for image source, source file: ${src}`)
  }
  return true
}

/**
 * Use the original file slug in custom filenames for generated images.
 * API from Eleventy images plugin.
 *
 * @param {object} _ - A curried EleventyConfig object from '.eleventy.js'
 * @param {string} src - Original image path
 * @param {number} width - Current width in px
 * @param {'jpeg'|'webp'} format - Current file format
 * @returns {string} - The image file name with extension
 */
exports.filenameFormat = (_, src, width, format) => {
  const extension = path.extname(src)
  const name = path.basename(src, extension)
  return `${name}-${width}w.${format}`
}

const stripLeadingSlash = filePath => filePath.replace(/^\/+/, '')
exports.stripLeadingSlash = stripLeadingSlash

const stripTrailingSlash = filePath => filePath.replace(/\/$/, '')
exports.stripTrailingSlash = stripTrailingSlash

/**
 * Strips the filename and extension from a relative file path
 *
 * @param {string} filePath - the file path passed to asyncImageHandler from a shortcode
 * @returns {string} returns the relative files paths e.g. 'avatars/' from '/avatars/john-smith.jpeg'
 */
const getRootPathsFromFilePath = filePath => stripLeadingSlash(filePath.replace(/[^\/]*$/, ''))
exports.getRootPathsFromFilePath = getRootPathsFromFilePath

/**
 * Tests whether a file path is a relative path
 *
 * @param {string} filePath - the file path passed to asyncImageHandler from a shortcode
 * @returns {boolean} whether the filename matches
 */
const isRelativeFilePath = filePath => {
  if (filePath.startsWith(`/`)) return false
  return /^[^:\*\?"<>\|]+$/.test(filePath)
}
exports.isRelativeFilePath = isRelativeFilePath

/**
 * Render a Nunjucks template using a new environment, so it doesn't pick up Eleventy's
 * configuration for the Nunjucks compiler.
 *
 * @param {string} template - The template to render
 * @param {object} context - A Nunjucks context to use while rendering
 * @returns {string} - The rendered template output
 */
exports.renderTemplate = (template, context) => {
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(
      path.join(process.cwd(), 'eleventy/nunjucksAsyncShortcodes/asyncImageHandler')
    ),
    {
      lstripBlocks: true, // remove leading whitespace from a block/tag
      throwOnUndefined: true, // throw errors when outputting a null/undefined value
    }
  )
  env.addFilter('getDataSrcset', getDataSrcset)
  return env.render(template, context)
}

/**
 * Returns a string with srcset for script to swap in
 *
 * @param {Array<object>} formatItems - An array of objects for a media type like jpeg, each with a 'srcset' key
 * @returns {string} a string of source sets formatted for a <picture> element
 */
const getDataSrcset = formatItems => {
  return formatItems
    .filter(imageObject => imageObject.width !== 1)
    .map(filtered => filtered.srcset)
    .join(', ')
}
// getDataSrcset() is used elsewhere in this file so exports is a separate statement
exports.getDataSrcset = getDataSrcset
