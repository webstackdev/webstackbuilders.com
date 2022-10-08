/**
 * Gulp task to build SCSS for the project's main production
 * CSS bundle and output it to the 'public' directory
 */

import { dest, series, src, watch } from 'gulp'
import type { TaskFunction } from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import lazypipe from 'lazypipe'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import { resolve } from 'path'
import { log } from '../utils'
import { cssBuildDir, scssSourceDir } from '../paths'

const sass = gulpSass(dartSass)

export const buildCssTaskPipe = lazypipe()
  .pipe(sourcemaps.init)
  // synchronous mode w/Dart SASS is 2x as fast as async since Node removed fibers in v16
  /* eslint-disable-next-line @typescript-eslint/unbound-method */
  .pipe(sass.sync)
  .pipe(() => rename(`index.css`))
  // source maps by default are written inline in the compiled CSS files if no path as param
  .pipe(() => sourcemaps.write('.'))

const buildCssTask: TaskFunction = () => {
  log(`Compiling SCSS to production CSS bundle`)
  return src(`${scssSourceDir}/index.scss`) // index.scss include file in assets
    .pipe(buildCssTaskPipe())
    .pipe(dest(cssBuildDir))
    .on('finish', () => {
      log(`Development CSS bundle output to ${resolve(cssBuildDir, `index.css`)}`)
    })
}

const task: TaskFunction = () => {
  log(`Watching for changes to source SCSS files`)
  watch([scssSourceDir], {}, buildCssTask)
}

export default series(buildCssTask, task)
