/// <reference path="../../../@types/@11ty/eleventy.d.ts" />
/**
 * Run the Eleventy CLI to build the site HTML
 */
//import Eleventy from '@11ty/eleventy'
import run from 'gulp-run-command'
import type { TaskFunction } from 'gulp'
import { log } from '../utils'

const task: TaskFunction = async done => {
  log(`Compiling HTML for production bundle`)

  try {
    // Programmatic:
    //const eleventy = new Eleventy()
    //await eleventy.write()
    await run('yarn run eleventy')()
    done()
  } catch (err) {
    if (err instanceof Error) {
      done(err)
      return
    }
    throw err
  }
}

export default task
