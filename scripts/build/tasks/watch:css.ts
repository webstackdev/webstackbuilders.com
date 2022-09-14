/**
 * Gulp task to build SCSS for the project's main production
 * CSS bundle and output it to the 'public' directory
 */

import { watch } from 'gulp'
import type { TaskFunction } from 'gulp'
import { log } from '../utils'
import { scssSourceDir } from '../paths'
import buildCssTask from './build:css'

const task: TaskFunction = () => {
  log(`Watching for changes to source SCSS files`)
  watch([scssSourceDir], {}, buildCssTask)
}

export default task
