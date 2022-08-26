/**
 * Gulp task to watch HTML for changes
 */

import type { GulpHelpTaskParamsFlattened } from '../baseTask'
import gulp from 'gulp'
import { log } from '../utils'

export const taskParams: GulpHelpTaskParamsFlattened = {
  /** All tasks that should be run before this one */
  dependencies: ['watch:html'],
  /** Function to execute the task */
  fn: done => {
    log(`Watching SCSS files...`)
    // cross-var npx @11ty/eleventy --watch --serve --incremental --port=%ELEVENTY_DEV_SERVER_PORT%
    done()
  },
}
