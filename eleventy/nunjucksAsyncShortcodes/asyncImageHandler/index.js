const sharp = require('sharp')
const Image = require('@11ty/eleventy-img')
const {
  checkForAltMetadata,
  filenameFormat,
  getImagePaths,
  pathsExist,
  renderTemplate,
} = require('./utils')

const ImageWidths = {
  ORIGINAL: undefined,
  PLACEHOLDER: 24,
}

/**
 * Shortcode to generate optimized images for production builds
 *
 * @param {object} _ - a curried EleventyConfig object
 * @param {string} src - the name of the image fil, prepended with a backslash if the file is in the build `images` directory
 * @param {string} alt - required alternative text for accessibility
 * @param {string} className - class names to add to the outputted HTML
 * @param {Array<number>} widths - responsive breakpoints for the image
 * @param {string} baseFormat - format of the default file to generate e.g. jpeg
 * @param {Array<string>} optimizedFormats - format to generate for optimized browsers e.g. webp
 * @param {string} sizes - size for the image HTML, e.g. 100vw
 * @param {boolean} lazy - whether the image file should be lazy-loaded
 * @returns {string} an html snippet for the image
 */
exports.asyncImageHandler = async function (
  _,
  src,
  alt,
  className = '',
  widths = [400, 800, 1280],
  baseFormat = 'jpeg',
  optimizedFormats = ['webp'],
  sizes = '100vw',
  lazy = false
) {
  // All images require alt tag for accessibility
  checkForAltMetadata(alt, src)

  // Need to skip the Image() call and return a built <img> tag with an external URL as src
  if (src.startsWith('http:') || src.startsWith('https:'))
    return `<img src="${src}" alt="${alt}" />`

/*
inputPath: "./src/pages/articles/helloworld/index.md",
fileSlug: "helloworld",
filePathStem: "/pages/articles/helloworld/index",
outputFileExtension: "html",

url: "/https:/www.webstackbuilders.com/pages/articles/helloworld/index/helloworld.html",
outputPath: "public/https:/www.webstackbuilders.com/pages/articles/helloworld/index/helloworld.html",
*/
  // Get paths based on whether image is in the images folder or in a Markdown file folder
  const { imagePath, outputDir, urlPath } = getImagePaths(src, this.page.filePathStem)

  // Throws if the image path doesn't exist or the output directory can't be created
  pathsExist(imagePath, outputDir, src)

  // Generate images from the source in specified widths and formats, and return the metadata on them
  const imageMetadata = await Image(imagePath, {
    widths: [ImageWidths.ORIGINAL, ImageWidths.PLACEHOLDER, ...widths],
    formats: [...optimizedFormats, baseFormat],
    outputDir,
    urlPath,
    filenameFormat,
    sharpOptions: {
      animated: true, // Process animated webp files
    },
  })

  /**
   * Blurred image placeholder for lazy loading
   */
  const placeholder = await sharp(imageMetadata[baseFormat][0].outputPath)
    .resize({ fit: sharp.fit.inside })
    .blur()
    .toBuffer()

  const base64Placeholder = `data:image/png;base64,${placeholder.toString('base64')}`

  /**
   * Returns an HTML <picture> element string with keys for each image format
   * with properties `placeholder` and `largest` showing the image size.
   */
  return renderTemplate(`picture.njk`, {
    alt,
    base64Placeholder,
    className,
    ImageWidths,
    items: Object.values(imageMetadata),
    lazy,
    sizes,
    lowSrc: imageMetadata[baseFormat][0],
    highSrc: imageMetadata[baseFormat][imageMetadata[baseFormat].length - 1],
  })
}
