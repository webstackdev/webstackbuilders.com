/**
 * Run a web server that serves from the production build for e2e testing
 */

import type { TaskFunction } from 'gulp'
import run from 'gulp-run-command'
import * as dotenv from 'dotenv'
import { buildDir } from '../paths'
import { log } from '../utils'

dotenv.config()

const task: TaskFunction = async done => {
  log(`Serving production build. Make sure site is built before running this command.`)
  const testingPort = process.env.ELEVENTY_TESTING_SERVER_PORT
  const serveDir = `./${buildDir}/`
  try {
    /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */
    await run(`ELEVENTY_ENV=testing yarn dlx serve -l ${testingPort} ${serveDir}`)()
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
