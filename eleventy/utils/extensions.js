/**
 * Generic way to add extensions like filters and shortcodes to the Eleventy config object
 */
const _ = require('lodash')

/** @member _eleventyConfig The configuration object with 11ty API used in `.eleventy.js` */
let _eleventyConfig
/** @member _eleventySetup Local setup in the eleventy directory, like filters and shortcodes */
let _eleventySetup

/** @member extensionTypes The types of extensions that will be added to Eleventy's config. These correspond to exports from the `eleventy/index.js` file. */
const extensionTypes = [
  `filters`,
  `nunjucksAsyncShortcodes`,
  `nunjucksFilters`,
  `nunjucksShortcodes`,
  `pairedShortcodes`,
  `shortcodes`
]

const isValidExtensionType = extensionType => extensionTypes.includes(extensionType)

/**
 * Builds the function name to add the extension for 11ty API methods, like `addFilter`
 *
 * @param {string} extensionType plural name of the extension type, like 'filters'
 * @returns {string} the name of the 11ty API method, like `addFilter`
 */
const getExtensionFnName = extensionType => {
  if (!isValidExtensionType(extensionType)) {
    const types = extensionTypes.join(', ')
    throw new Error(
      `Extension type not supported: received ${extensionType} but should be one of ${types}`
    )
  }
  // Capitalize first letter
  let extensionFnName = extensionType.charAt(0).toUpperCase() + extensionType.slice(1)
  // Strip trailing 's'
  extensionFnName = extensionFnName.replace(/s{1}$/, '')
  // Prepend 'add'
  return `add${extensionFnName}`
}

/**
 * Curries the `eleventyConfig` object into all extension functions and then registers  them,
 * so that global data is available in filters, shortcodes, etc. without relying on `this`.
 *
 * @param {string} extensionType plural name of the extension type, like 'filters'
 * @param {string} extensionName the name of the extension being added, like 'absoluteUrl'
 * @returns {function(...*): NodeJS.ReadWriteStream} curried function with `eleventyConfig` set as the first parameter
 */
const curryExtension = (extensionType, extensionName) => {
  const handler = _eleventySetup[extensionType][extensionName]
  return _.curry(handler)(_eleventyConfig)
}

/**
 * Registers the extensions for a given type based on them being included on the
 * `eleventySetup` object e.g. `filters` using the 11ty config API using the
 * `eleventyConfig.addFilter` method.
 *
 * @param {string} extensionType the type of extension from `extensionTypes`, like `filters`.
 */
const addExtensionsByType = extensionType => {
  const extensions = _eleventySetup[extensionType]
  /** Bail if no extensions for the given type are pulled into the 'eleventySetup' object */
  if (!extensions || extensions.length == 0) return
  /** Iterate over all modules exported from the root eleventy/index.js file that are in */
  Object.keys(extensions).forEach(extensionName => {
    try {
      /** e.g. eleventyConfig.addFilter(name, fn) */
      _eleventyConfig[getExtensionFnName(extensionType)](
        extensionName,
        curryExtension(extensionType, extensionName)
      )
    } catch (err) {
      throw new Error(
        `Error adding extension '${extensionName}' for type '${extensionType}'.\nDoes it handle the first curried parameter 'eleventyConfig'? Error message:\n${err}`
      )
    }
  })
}

/**
 * Call the add function for each extension type on the bespoke `eleventySetup`
 * object that is created from requires in `eleventy/index.js` to register the
 * extensions with Eleventy.
 *
 * @param {import('../../@types/eleventyConfig').Config} eleventyConfig 11ty config object
 * @param {object} eleventySetup Object with requires from the 'eleventy' directory
 */
exports.extensionsInit = (eleventyConfig, eleventySetup) => {
  _eleventyConfig = eleventyConfig
  _eleventySetup = eleventySetup
  extensionTypes.forEach(extensionType => addExtensionsByType(extensionType))
}

/** For testing */
exports._isValidExtensionType = isValidExtensionType
exports._getExtensionFnName = getExtensionFnName
exports._curryExtension = curryExtension
exports._addExtensionsByType = addExtensionsByType
