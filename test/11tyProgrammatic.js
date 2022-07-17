/**
 * 11ty CLI w/ programmatic API
 */

// Output to JSON:
const Eleventy = require('@11ty/eleventy')

exports.eleventyProgrammatic = async filePath => {
  //  first argument is the input directory, second argument is the output directory.
  let eleventy = new Eleventy(filePath, 'public', {
    // --quiet
    //quietMode: false,

    // --config
    configPath: './.eleventy.js',

    /*config: function (eleventyConfig) {
      // Do some custom Configuration API stuff
      // Works great with eleventyConfig.addGlobalData
    },*/
  })

  // Output a JSON structure (does not write to the file system)
  const output = await eleventy.toJSON()
  return output
}
