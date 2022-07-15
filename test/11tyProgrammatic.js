/**
 * 11ty CLI w/ programmatic API
 */

// Output to JSON:
const Eleventy = require('@11ty/eleventy')
/*
;(async function () {
  //  first argument is the input directory, second argument is the output directory.
  let elev = new Eleventy('.', '_site', {
    // --quiet
    quietMode: true,

    // --config
    configPath: '.eleventy.js',

    config: function (eleventyConfig) {
      // Do some custom Configuration API stuff
      // Works great with eleventyConfig.addGlobalData
    },
  })
  let json = await elev.toJSON()
  // All results
  console.log(json)
})()
*/
