const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  // Enable minification and tree-shaking
  mode: 'production',
  /**
   * Webpack includes Terser out of the box in production mode, but it's necessary
   * to install it and include it in the config to modify Terser's default settings.
   */
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
})
