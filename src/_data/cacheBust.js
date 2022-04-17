const path = require('path')
const md5File = require('md5-file')

/**
 * Manage cache-busting keys to add to asset URLs. 11ty adds the
 * return value from this function to the global data scope.
 *
 * @returns an object with common names of files as keys e.g. `mainCSS`, and
 * the computed md5 hash for the file (or current date if in dev) as values.
 */
const cacheBust = () => {
  // Map of files to cache bust
  const files = {
    mainCss: path.resolve(__dirname, '../../public/css/index.css'),
    mainJs: path.resolve(__dirname, '../../public/js/index.js'),
    //vendorJs: path.resolve(__dirname, '../../public/js/vendor.js'),
  }

  return Object.entries(files).reduce((acc, [key, path]) => {
    acc[key] = process.env.ELEVENTY_ENV === 'production' ? md5File.sync(path) : Date.now()
    return acc
  }, {})
}

module.exports = cacheBust
