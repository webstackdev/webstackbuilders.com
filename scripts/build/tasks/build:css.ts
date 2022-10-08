/**
 * Gulp task to build SCSS for the project's main production
 * CSS bundle and output it to the 'public' directory
 */

import type { TaskFunction } from 'gulp'
import dartSass from 'sass'
import cssnano from 'cssnano'
import { dest, src } from 'gulp'
import gulpSass from 'gulp-sass'
import lazypipe from 'lazypipe'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'
import { resolve } from 'path'
import svgo from 'postcss-svgo'
import { cssBuildDir, scssSourceDir } from '../paths'
import { log } from '../utils'

const sass = gulpSass(dartSass)

export const buildCssTask = lazypipe()
  // synchronous mode w/Dart SASS is 2x as fast as async since Node removed fibers in v16
  /* eslint-disable-next-line @typescript-eslint/unbound-method */
  .pipe(sass.sync)
  // add vendor prefixing and focused optimizations
  .pipe(() => postcss([svgo(), cssnano()]))
  .pipe(() => rename(`index.css`))

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
