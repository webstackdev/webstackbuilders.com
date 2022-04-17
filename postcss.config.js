const autoprefixer = require('autoprefixer')
//const cssnano = require('cssnano')
//const postcssImport = require('postcss-import')
//const postcssPresetEnv = require('postcss-preset-env')

// @TODO: Need a production SASS pipeline setup

/**
 *  Webstack `postcss-loader` transformations to apply
 */
module.exports = {
  plugins: [
    // eslint-disable-next-line global-require
    autoprefixer(),
    //postcssImport(),
    //postcssPresetEnv(),
    //cssnano(),
  ],
}
