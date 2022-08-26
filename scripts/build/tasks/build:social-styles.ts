/**
 * Build the CSS bundle used to style social share images
 */

import { log } from '../utils'
import type { GulpHelpTaskParamsFlattened } from '../baseTask'
import { buildCssTask } from './build:css'
import { socialScssSourceDir, socialCssTargetDir } from '../paths'

export const taskParams: GulpHelpTaskParamsFlattened = {
  /** Function to execute the task */
  fn: done => {
    log(`Compiling SCSS to production CSS bundle`)
    return plumbedGulpSrc(socialScssSourceDir) // social.scss in assets
      .pipe(buildCssTask)
      .pipe(gulp.dest(socialCssTargetDir))
      .on('end', done)
  },
}
