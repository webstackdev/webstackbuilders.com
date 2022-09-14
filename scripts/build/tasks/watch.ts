/**
 * Task to build the complete project, set file watchers, and launch dev server
 */
import { series } from 'gulp'
import type { TaskFunction } from 'gulp'

import watchLambda from './watch:lambda'
import watchScript from './watch:script'

const task: TaskFunction = series(watchLambda, watchScript)
export default task
