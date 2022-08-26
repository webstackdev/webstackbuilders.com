/**
 * Run Yarn Doctor on package.json dependencies
 */
import { log, plumbedGulpSrc } from '../utils'

import type { TaskFunction } from 'gulp'
import lazypipe from 'lazypipe'
import { scriptLintSourceGlobs } from '../paths'

export const lintScriptTask = lazypipe()
  // Yarn Doctor
  .pipe()

const task: TaskFunction = () => {
  log(`Linting script source code`)
  return plumbedGulpSrc(scriptLintSourceGlobs).pipe(lintScriptTask())
}

export default task