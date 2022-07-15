/**
 * Transformer for Typescript syntax that is not supported by Node
 */
const babelOptions = {
  presets: ['@babel/preset-typescript'],
}

/** Compile JavaScript code using Babel */
module.exports = require('babel-jest').default.createTransformer(babelOptions)
