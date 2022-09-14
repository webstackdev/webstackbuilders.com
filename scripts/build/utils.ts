import chalk from 'chalk'
import fancyLog from 'fancy-log'

export const isDevelopment = process.env[`ELEVENTY_ENV`] === `development`

/**
 * Error object coming from gulp
 */
export interface GulpError {
  /** Error message */
  message: string
  /** Flag if the call stack should be shown */
  showStack: boolean
  /** Flag if the error properties should be shown */
  showProperties: boolean
  /** Name of the gulp plugin that published the error */
  plugin: string
}

/**
 * Log a message or series of messages using chalk's blue color.
 *
 * @param message - Message(s) to write to the log.
 */
type logColor = `red` | `green` | `yellow` | `blue` | `magenta` | `cyan` | `white`
export const log = (message: string | string[], color: logColor = `magenta`) => {
  if (message instanceof Array) {
    message.forEach((item) => {
      // eslint-disable-next-line security/detect-object-injection
      fancyLog(chalk[color](item))
    })
  } else {
    // eslint-disable-next-line security/detect-object-injection
    fancyLog(chalk[color](message))
  }
}

/**
 * Logs any errors that are passed in
 *
 * @param error   - Error object to log.
 */
log.error = (error: GulpError): void => {
  log(error.toString(), `red`)
}

export const withError = (msg: string) => {
  const err = new Error(msg) as unknown as GulpError
  err.showStack = false
  return err
}
