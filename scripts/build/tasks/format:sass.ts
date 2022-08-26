/**
 * Lint SCSS Stylesheets
 */
import { log, plumbedGulpSrc } from '../utils'

import type { TaskFunction } from 'gulp'
import lazypipe from 'lazypipe'
import { scriptLintSourceGlobs } from '../paths'

export const lintScriptTask = lazypipe()
  // stylelint --fix 'src/assets/css/**/*.scss' --custom-syntax postcss-scss
  .pipe()

const task: TaskFunction = () => {
  log(`Linting script source code`)
  return plumbedGulpSrc(scriptLintSourceGlobs).pipe(lintScriptTask())
}

export default task
