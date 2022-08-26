/**
 * Gulp task to build SCSS for the project's main production
 * CSS bundle and output it to the 'public' directory
 */

import type { GulpHelpTaskParamsFlattened } from '../baseTask'
import gulp from 'gulp'
import { log } from '../utils'
import { scssWatchGlob } from '../paths'

export const taskParams: GulpHelpTaskParamsFlattened = {
  /** All tasks that should be run before this one */
  dependencies: ['build:css'],
  /** Function to execute the task */
  fn: done => {
    log(`Watching SCSS files...`)
    gulp.watch(scssWatchGlob)
    done()
  },
}
