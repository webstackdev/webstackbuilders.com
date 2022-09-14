/// <reference path="../../../@types/@11ty/eleventy.d.ts" />
/**
 * Gulp task to watch HTML for changes
 */
import Eleventy from '@11ty/eleventy'
import type { TaskFunction } from 'gulp'
import { log } from '../utils'

const task: TaskFunction = async done => {
  log(`Compiling HTML for production bundle`)
  try {
    // cross-var npx @11ty/eleventy --watch --serve --incremental --port=%ELEVENTY_DEV_SERVER_PORT%
    const eleventy = new Eleventy()
    await eleventy.write()
    await eleventy.watch()
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
