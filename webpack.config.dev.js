const { merge } = require('webpack-merge')
const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  // Allow watching and live reloading of assets
  watch: true,
})
