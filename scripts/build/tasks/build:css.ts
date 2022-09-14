/**
 * Gulp task to build SCSS for the project's main production
 * CSS bundle and output it to the 'public' directory
 */

import { cssBuildDir, scssSourceDir } from '../paths'
import { isDevelopment, log } from '../utils'

import type { TaskFunction } from 'gulp'
import dartSass from 'sass'
import cssnano from 'cssnano'
import { dest, src } from 'gulp'
import gulpSass from 'gulp-sass'
import gulpif from 'gulp-if'
import lazypipe from 'lazypipe'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'
import { resolve } from 'path'
import sourcemaps from 'gulp-sourcemaps'
import svgo from 'postcss-svgo'

const sass = gulpSass(dartSass)

export const buildCssTask = lazypipe()
  .pipe(sourcemaps.init)
  // synchronous mode w/Dart SASS is 2x as fast as async since Node removed fibers in v16
  /* eslint-disable-next-line @typescript-eslint/unbound-method */
  .pipe(sass.sync)
  // add vendor prefixing and focused optimizations
  .pipe(() => postcss([svgo(), cssnano()]))
  .pipe(() => rename(`index.css`))
  // source maps by default are written inline in the compiled CSS files if no path as param
  .pipe(() => gulpif(isDevelopment, sourcemaps.write('.')))

const task: TaskFunction = () => {
  log(`Compiling SCSS to production CSS bundle`)
  return src(`${scssSourceDir}/index.scss`) // index.scss include file in assets
    .pipe(buildCssTask())
    .pipe(dest(cssBuildDir))
    .on('finish', () => {
      log(`Production CSS bundle output to ${resolve(cssBuildDir, `index.css`)}`)
    })
}

export default task
