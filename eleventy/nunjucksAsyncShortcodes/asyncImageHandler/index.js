const path = require('path')
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
  ORIGINAL: null,
  PLACEHOLDER: 24,
}

exports.asyncImageHandler = async function (
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
  checkForAltMetadata(src, alt)

  // Need to skip the Image() call and return a built <img> tag with an external URL as src
  if (src.startsWith('http:') || src.startsWith('https:'))
    return `<img src="${src}" alt="${alt}" />`

  // Get paths based on whether image is in the images folder or in a Markdown file folder
  const { imagePath, outputDir, urlPath } = getImagePaths(src, this.page.url)

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
