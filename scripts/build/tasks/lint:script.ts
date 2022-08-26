import _ from 'lodash'
import { src } from 'gulp'
import gulpESLintNew from 'gulp-eslint-new'
import lazypipe from 'lazypipe'

import type { TaskFunction } from 'gulp'

import { log } from '../utils'
import { scriptLintSourceGlobs } from '../paths'

/**
 * Lint Javascript and Typescript
 */
export const lintScriptTask = lazypipe()
  /**
   * Lint files. ESLint autofix option is set to false so no fixes are created.
   */
  //.pipe(function () {
  //  return gulpESLintNew({ fix: false })
  //})
  .pipe(gulpESLintNew)
  /**
   * Overwrite files with the fixed content provided by ESLint, should be
   * used in conjunction with the option fix in `gulpESLintNew(options)`.
   */
  //.pipe(gulpESLintNew.fix)
  /**
   * Format all linted files in the stream once after piping through
   * gulpESLintNew. Outputs lint results to the console.
   */
  // eslint-disable-next-line @typescript-eslint/unbound-method
  .pipe(gulpESLintNew.format)


// Getting '* can't resolve reference #/definitions/directiveConfigSchema from id #'
// https://github.com/typescript-eslint/typescript-eslint/issues/5525
// See note in test also (skipped)
const task: TaskFunction = (done) => {
  log(`Linting script source code`)
   return src(scriptLintSourceGlobs)
     .pipe(lintScriptTask())
     .on('finish', () => done())
}

export default task
