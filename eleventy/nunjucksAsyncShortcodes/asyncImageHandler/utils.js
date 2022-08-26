const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')

/**
 * Eleventy image plugin fails when alt property isn't set so add better error description
 *
 * @param src
 * @param alt
 */
exports.checkForAltMetadata = (src, alt) => {
  if (!alt) {
    throw new Error(`Missing \`alt\` on property for image source, source file: ${src}`)
  }
  return true
}

/**
 * Use the original file slug in custom filenames for generated images.
 * API from Eleventy images plugin.
 *
 * @param _
 * @param {string} src original image path
 * @param {number} width current width in px
 * @param {'jpeg'|'webp'} format current file format
 * @returns String the image file name with extension
 */
exports.filenameFormat = (_, src, width, format) => {
  const extension = path.extname(src)
  const name = path.basename(src, extension)
  return `${name}-${width}w.${format}`
}

/**
 * Image files are either in /public/images directory or in a Markdown page's folder
 * next to index.md. Sources that are absolute paths are assumed relative to the images
 * asset directory, otherwise assumed to be in the Markdown file's directory.
 *
 * @param src
 * @param pageUrl
 */
exports.getImagePaths = (src, pageUrl) => {
  /*
  pageUrl examples:
  /articles/understanding-docker/
  /articles/helloworld/
  /
  */
  if (src.startsWith('/')) {
    // Images included in Nunjucks or Javascript templates using the `image` shortcode are
    // maintained in the assets/images folder and should be outputted to the /public/images
    // directory.
    return {
      // Absolute path to the image file to be processed
      imagePath: path.join(process.cwd(), '/src/assets/images', src),
      // Project-relative path to the output image directory to write generated images to
      outputDir: path.join(process.cwd(), '/public/images', path.parse(src).dir),
      // Directory for the <img src> attribute. e.g. /images/ for
      // <img src="/images/MY_IMAGE.jpeg">
      urlPath: path.join('/images/', path.parse(src).dir),
    }
  } else if (/^[^\\/:\*\?"<>\|]+$/.test(src)) {
    // src values that are not relative paths are assumed to be being used in a Markdown
    // page, because images directly used in templates so far have been maintained in the
    // assets/images folder. This keeps image files for Markdown pages in the page folder,
    // next to index.md
    return {
      // Absolute path to the image file to be processed
      imagePath: path.join(process.cwd(), '/src/pages', pageUrl, src),
      // Absolute path to the output image directory to write generated images to
      outputDir: path.join(process.cwd(), '/public', pageUrl),
      // Directory for the <img src> attribute. e.g. /images/ for <img src="/images/MY_IMAGE.jpeg">
      urlPath: `${pageUrl}`,
    }
  } else {
    throw new Error(`Couldn't find a strategy to process image source, source file: ${src}`)
  }
}

/**
 * Make sure the image path given points to an image file, and the output dir has been created
 *
 * @param {string} imagePath An absolute path to the image file to be processed
 * @param {string} outputDir Absolute path to the output image directory to write generated images to
 * @param {string} src Name of the image file passed to the Nunjucks image shortcode
 */
exports.pathsExist = (imagePath, outputDir, src) => {
  try {
    fs.accessSync(imagePath)
  } catch (error) {
    throw new Error(
      `Image path passed from template to image handler is not a valid path:\nSource image file name: ${src}\n${error.name}: ${error.message}`
    )
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  return true
}

/**
 * Render a Nunjucks template using a new environment, so it doesn't pick up Eleventy's
 * configuration for the Nunjucks compiler.
 *
 * @param template
 * @param context
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
 * @param [object] formatItems An array of objects for a media type like jpeg, each with a 'srcset' key
 * @param formatItems
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
