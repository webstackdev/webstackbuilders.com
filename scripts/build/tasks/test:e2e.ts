/**
 * 
 */

import { isDevelopment, log } from '../utils'
import { cssTargetDir } from '../paths'

import type { GulpHelpTaskParamsFlattened } from '../baseTask'
import gulp from 'gulp'

export const taskParams: GulpHelpTaskParamsFlattened = {
  /** All tasks that should be run before this one */
  dependencies: ['start:testing'],
  /** Function to execute the task */
  fn: done => {
    log(`Compiling SCSS to production CSS bundle`)
    // playwright test
  },
}
