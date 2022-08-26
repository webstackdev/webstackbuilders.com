/**
 * 
 */

import { isDevelopment, log } from '../utils'
import { cssTargetDir } from '../paths'

import type { GulpHelpTaskParamsFlattened } from '../baseTask'
import gulp from 'gulp'

export const taskParams: GulpHelpTaskParamsFlattened = {
  /** All tasks that should be run before this one */
  //dependencies: ['util:clean'],
  /** Function to execute the task */
  fn: done => {
    log(`Compiling SCSS to production CSS bundle`)
    // dotenv -c -v ELEVENTY_ENV=testing -- yarn run build  && dotenv -c -v ELEVENTY_ENV=testing -- cross-var serve -l %ELEVENTY_TESTING_SERVER_PORT% ./public/
  },
}
