/**
 * Logging utility for frontmatter validation function
 */
import { sprintf } from 'sprintf-js'
import { log } from '../../build/utils'

export const logResults = (pagePath: string, errors: Error[] | undefined) => {
  if (errors && errors.length) {
    // The filepaths of all errors in array should be the same, so show the first one for group
    log(`Frontmatter validation error in file:`, `red`)
    log(`${pagePath}\n`, `red`)
    errors.forEach(error => {
      log(`> Error: ${sprintf(error.message, error)}`, `red`)
    })
    log(`\n`)
  } else {
    log(`Front matter validated for page:`, `green`)
    log(`${pagePath}\n`, `yellow`)
  }
}
