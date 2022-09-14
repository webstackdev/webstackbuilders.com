const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')
const {
  buildDir,
  imagesBuildDir,
  imagesSourceDir,
} = require('../../../scripts/build/paths')
const { normalizeFilePathStem } = require('../../utils/permalinks')

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
 * Tests whether a filename matches the relative strategy
 *
 * @param {string} fileName - the file path passed to asyncImageHandler from a shortcode
 * @returns {boolean} whether the filename matches
 */
const isRelativeFilePath = fileName => {
  if (fileName.startsWith(`/`) || fileName.endsWith(`/`)) return false
  return /^[^:\*\?"<>\|]+$/.test(fileName)
}
exports.isRelativeFilePath = isRelativeFilePath

/**
 * Image files are either in /public/images directory or in a Markdown page's folder
 * next to index.md. Sources that are absolute paths are assumed relative to the images
 * asset directory, otherwise assumed to be in the Markdown file's directory.
 *
 * @param {string} fileName - The path in the build output directory to the image.
 * @param {string} filePathStem - Eleventy's 'page.filePathStem' value.
 * @returns {object} - An object with 'imagePath', 'outputDir', and 'urlPath' keys.
 */
exports.getImagePaths = (fileName, filePathStem) => {
  const relativeFilePath = normalizeFilePathStem(filePathStem)
  const rootPaths = getRootPathsFromFilePath(fileName)
  if (filePathStem.startsWith(`/pages/home`)) {
    /**
     * Absolute images used on the home page are output to the `images/home` folder
     * in the build dir
     */
    return {
      /** Absolute path to the image file to be processed */
      imagePath: path.join(process.cwd(), `src/pages/home/`, fileName),
      /** Project-relative path to the output image directory to write generated images to */
      outputDir: stripTrailingSlash(path.join(process.cwd(), imagesBuildDir, `home`, rootPaths)),
      /**
       * Directory for the <img src> attribute. e.g. /images/home/ for
       * <img src="/images/home/MY_IMAGE.jpeg">
       */
      urlPath: path.join('/images/home/', fileName),
    }
  } else if (fileName.startsWith('/')) {
    /**
     * Images included in Nunjucks or Javascript templates using the `image`
     * shortcode are maintained in the assets/images folder and should be
     * outputted to the /public/images directory.
     */
    const normalizedFileName = stripLeadingSlash(fileName)
    return {
      /** Absolute path to the image file to be processed */
      imagePath: path.join(process.cwd(), imagesSourceDir, normalizedFileName),
      /** Project-relative path to the output image directory to write generated images to */
      outputDir: stripTrailingSlash(path.join(process.cwd(), imagesBuildDir, relativeFilePath)),
      /**
       * Directory for the <img src> attribute. e.g. /images/ for
       * <img src="/images/MY_IMAGE.jpeg">
       */
      urlPath: path.join('/images/', fileName),
    }
  } else if (isRelativeFilePath(fileName)) {
    /**
     * `fileName` values that are not relative paths are assumed to be being used in
     * a Markdown page, because images directly used in templates so far have been
     * maintained in the assets/images folder. This keeps image files for Markdown
     * pages in the page folder, next to index.md
     */
    return {
      /** Absolute path to the image file to be processed */
      imagePath: path.join(process.cwd(), `src/pages`, relativeFilePath, fileName),
      /** Absolute path to the output image directory to write generated images to */
      outputDir: stripTrailingSlash(path.join(process.cwd(), buildDir, relativeFilePath)),
      /**
       * Directory for the <img src> attribute. e.g. /images/ for
       * <img src="/images/MY_IMAGE.jpeg">
       */
      urlPath: path.join(`/`, relativeFilePath, fileName),
    }
  } else {
    throw new Error(`Couldn't find a strategy to process image source, source file: ${fileName}`)
  }
}

/**
 * Make sure the image path given points to an image file, and the output dir has been created
 *
 * @param {string} imagePath - An absolute path to the image file to be processed
 * @param {string} outputDir - Absolute path to the output image directory to write generated images to
 * @param {string} fileName - Name of the image file passed to the Nunjucks image shortcode
 * @returns {boolean|undefined} - Returns true if path either exists or is created
 */
exports.pathsExist = (imagePath, outputDir, fileName) => {
  try {
    fs.accessSync(imagePath)
  } catch (error) {
    throw new Error(
      `Image path passed from template to image handler is not a valid path:\nSource image file name: ${fileName}\nSource image file path: ${imagePath}\nOutput directory: ${outputDir}\n${error.name}: ${error.message}`
    )
  }

  /* eslint-disable security/detect-non-literal-fs-filename */
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  /* eslint-enable security/detect-non-literal-fs-filename */
  return true
}

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
