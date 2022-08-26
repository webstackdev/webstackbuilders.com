// Makes Sass faster!
const path = require('path')

/**
 * Webpack 5 Loaders:
`asset/resource` emits a separate file and exports the URL. Previously achievable by using `file-loader`.
`asset/inline` exports a data URI of the asset. Previously achievable by using `url-loader`.
`asset/source` exports the source code of the asset. Previously achievable by using `raw-loader`.
`asset` automatically chooses between exporting a data URI and emitting a separate file. Previously achievable by using `url-loader` with asset size limit.
 */

module.exports = {
  /**
   * indicates which module webpack should use to begin building out its internal
   * dependency graph. Webpack will figure out which other modules and libraries that
   * entry point depends on (directly and indirectly). Default value is `./src/index.js`.
   */
  entry: './src/assets/script/index.ts',
  /**
   * tells webpack where to emit the bundles it creates and how to name these files.
   * It defaults to ./dist/main.js for the main output file and to the ./dist folder
   * for any other generated file.
   */
  output: {
    // Where webpack will compile the assets
    path: path.resolve(__dirname, 'public/js'),
    filename: 'index.js',
  },
  // Add `.ts` as a resolvable extension.
  resolve: {
    extensions: ['.ts', '.js'],
  },
  // Loaders describe to webpack how to process non-native modules and include these
  // dependencies into your bundles. Native loaders are ECMAScript, CommonJS, and AMD.
  module: {
    rules: [
      {
        // Transpile and polyfill client-side JavaScript files.
        // All files with a `.ts` extension will be handled by `ts-loader`.
        test: /\.ts$/,
        use: [
          {
            loader: require.resolve(`ts-loader`),
            options: {
              configFile: 'tsconfig.webpack.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
}
