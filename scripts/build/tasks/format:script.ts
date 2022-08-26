import _ from 'lodash'
import { src } from 'gulp'
import gulpESLintNew from 'gulp-eslint-new'
import lazypipe from 'lazypipe'

import type { TaskFunction } from 'gulp'

import { log } from '../utils'
import { scriptLintSourceGlobs } from '../paths'

/**
 * Format Javascript and Typescript
 */
export const formatScriptTask = lazypipe()
  /**
   * Lint files. ESLint autofix option is set to false so no fixes are created.
   */
  .pipe(function () {
    return gulpESLintNew({ fix: true })
  })
  /**
   * Overwrite files with the fixed content provided by ESLint, should be
   * used in conjunction with the option fix in `gulpESLintNew(options)`.
   */
  // eslint-disable-next-line @typescript-eslint/unbound-method
  .pipe(gulpESLintNew.fix)
  /**
   * Format all linted files in the stream once after piping through
   * gulpESLintNew. Outputs lint results to the console.
   */
  // eslint-disable-next-line @typescript-eslint/unbound-method
  .pipe(gulpESLintNew.format)
  /**
   * Stop a task/stream if an ESLint error has been reported for
   * any file, but wait for all of them to be processed first.
   */
  // eslint-disable-next-line @typescript-eslint/unbound-method
  .pipe(gulpESLintNew.failAfterError)

const task: TaskFunction = done => {
  log(`Linting script source code`)
  return src(scriptLintSourceGlobs)
    .pipe(formatScriptTask())
    .on('end', () => done())
}

export default task
