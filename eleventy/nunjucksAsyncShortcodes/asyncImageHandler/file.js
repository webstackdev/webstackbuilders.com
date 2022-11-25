const fs = require('fs')

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

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  return true
}
