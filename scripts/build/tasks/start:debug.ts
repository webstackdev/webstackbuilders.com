/**
 *
 */

import type { TaskFunction } from 'gulp'
import { log } from '../utils'

export const taskFunction: TaskFunction = done => {
  log(`Compiling SCSS to production CSS bundle`)
  // DEBUG=Eleventy* yarn run start
  done()
}
