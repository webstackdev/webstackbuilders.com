/**
 * Inline Typescript compiler for use in passing string script to JSDOM
 */
import { resolve } from 'path'
import MemoryFs from 'memory-fs'
import webpack from 'webpack'

const outputDirPath = resolve('tmp')
const outputFilename = 'app.min.js'
const outputPath = resolve(outputDirPath, outputFilename)

const getWebpackConfig = (entryFile: string): webpack.Configuration => {
  return {
    mode: 'development',
    devtool: 'hidden-source-map',
    entry: resolve(process.cwd(), entryFile),
    output: {
      path: outputDirPath,
      filename: outputFilename,
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
}

export function isStatsObject(input: unknown): input is webpack.Stats {
  if (
    input &&
    typeof input === 'object' &&
    typeof (input as webpack.Stats)['hasErrors'] === 'function' &&
    typeof (input as webpack.Stats)['hasWarnings'] === 'function' &&
    typeof (input as webpack.Stats)['toString'] === 'function'
  )
    return true
  return false
}

export const tsCompile = async (entryFile: string) => {
  const compiler = webpack(getWebpackConfig(entryFile))
  compiler.outputFileSystem = new MemoryFs()

  return new Promise<string>((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err)
      if (!isStatsObject(stats)) return reject(`stats object in tsCompile is not valid`)
      if (stats.hasErrors() || stats.hasWarnings()) {
        return reject(
          new Error(
            stats.toString({
              errorDetails: true,
              warnings: true,
            })
          )
        )
      }

      const result = (compiler.outputFileSystem as unknown as MemoryFs)
        .readFileSync(outputPath)
        .toString()
      resolve(result)
    })
  })
}
