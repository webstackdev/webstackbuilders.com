/**
 *
 */

import { isDevelopment, log } from '../utils'

import type { GulpHelpTaskParamsFlattened } from '../baseTask'
import { cssTargetDir } from '../paths'
import gulp from 'gulp'

export const taskParams: GulpHelpTaskParamsFlattened = {
  /** All tasks that should be run before this one */
  //dependencies: ['util:clean'],
  /** Function to execute the task */
  fn: done => {
    log(`Compiling SCSS to production CSS bundle`)
    // build:sprites build:css watch:css postbuild:social-images postbuild:social-styles watch:html watch:script
  },
}
