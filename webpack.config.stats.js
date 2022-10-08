const { resolve } = require('path')
const dotenv = require('dotenv')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const common = require('./webpack.config.common.js')

const result = dotenv.config({ path: resolve(process.cwd(), '.env.local') })
if (result['error']) throw result.error
if (!result['parsed']) throw new Error()

const analyzerPort = result.parsed['ELEVENTY_DEV_SERVER_PORT']

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
        extractComments: true,
      }),
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort,
      defaultSizes: `gzip`,
    }),
  ],
})
