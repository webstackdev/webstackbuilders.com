/**
 * Manage cache-busting keys to add to asset URLs. 11ty adds the
 * return value from this function to the global data scope.
 *
 * @returns an object with common names of files as keys e.g. `mainCSS`, and
 * the computed md5 hash for the file (or current date if in dev) as values.
 */
const { existsSync } = require('fs')
const { resolve } = require('path')
const md5File = require('md5-file')

// @TODO: Maybe should write a shortcode that pulls this value and checks for development environment to attach cache busting string. Used in _layouts/base.njk for script include.

module.exports = () => {
  // Map of files to cache bust
  // @TODO: Why not just use one key for any file, since they're all the same?
  const files = {
    // ENOENT: no such file or directory
    mainCss: '../../public/css/index.css',
    mainJs: '../../public/js/index.js',
    //vendorJs: '../../public/js/vendor.js',
  }

  return Object.entries(files).reduce((acc, [key, assetPath]) => {
    if (process.env.ELEVENTY_ENV === 'production' && existsSync(assetPath)) {
      // eslint-disable-next-line security/detect-object-injection
      acc[key] = md5File.sync(resolve(__dirname, assetPath))
    } else {
      // eslint-disable-next-line security/detect-object-injection
      acc[key] = Date.now()
    }
    return acc
  }, {})
}
