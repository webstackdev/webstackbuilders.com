const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  // Enable minification and tree-shaking
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
})
