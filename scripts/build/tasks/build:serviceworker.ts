/**
 * Use Google Workbox to generate a service worker for the site. This
 * could be done as a Webpack plugin, but is done here instead to simplify
 * coordination. This must run as a last step in the build process so
 * that all assets are ready to be added to the list of assets to precache.
 *
 * @TODO: Add push notifications with PushManager.subscribe()
 *        https://developer.mozilla.org/en-US/docs/Web/API/Push_API
 * @TODO: Refactor to use streaming service worker, see README.md
 * @TODO: This currently precaches *everything*
 */

import { log } from '../utils'
import SWConfig from '../../..//workbox.config.js'
import { generateSW } from 'workbox-build'
import type { GulpHelpTaskParamsFlattened } from '../baseTask'

export const taskParams: GulpHelpTaskParamsFlattened = {
  /** Function to execute the task */
  fn: () => {
    // SW config set to output to path.join('./public/', 'service-worker.js')
    return generateSW(SWConfig).then(({ count, size, warnings }) => {
      log(`Generating a service worker`)
      if (!warnings.length) {
        log(`Generated a service worker, which will precache ${count} files, totaling ${size} bytes.`)
      } else {
        log.error('Warnings encountered while generating a service worker:' + warnings.join('\n'))
      }
    })
  },
}
