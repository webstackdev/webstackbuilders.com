/// <reference path="../../../@types/@11ty/eleventy.d.ts" />
/**
 * Call the Eleventy CLI programmatically to build the site HTML
 */
import Eleventy from '@11ty/eleventy'
import type { TaskFunction } from 'gulp'
import { log } from '../utils'

const task: TaskFunction = async done => {
  log(`Compiling HTML for production bundle`)
  if (process.env.ELEVENTY_ENV === `development`) process.env.DEBUG=`Eleventy*`
  try {
    const eleventy = new Eleventy()
    await eleventy.write()
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
