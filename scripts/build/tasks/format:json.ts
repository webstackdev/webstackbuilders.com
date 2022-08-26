/**
 * Lint JSON
 */
import { log, plumbedGulpSrc } from '../utils'

import type { TaskFunction } from 'gulp'
import lazypipe from 'lazypipe'
import { scriptLintSourceGlobs } from '../paths'

export const lintScriptTask = lazypipe()
  // prettier '**/*.json' --write
  .pipe()

const task: TaskFunction = () => {
  log(`Linting script source code`)
  return plumbedGulpSrc(scriptLintSourceGlobs).pipe(lintScriptTask())
}

export default task
