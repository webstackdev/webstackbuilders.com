module.exports = {
  /**
   * `entry` and `output` are handled by CLI parameter to `netlify-lambda`
   * and setting in `netlify.toml`.
   */
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
              configFile: 'tsconfig.lambda.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
}
