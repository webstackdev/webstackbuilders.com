/**
 * Error handler and tests for environment
 */

export const isJsdomSetOnGlobal = () => {
  /* eslint-disable-next-line no-null/no-null */
  if (globalThis === null) throw new Error('JSDOM did not return a Window object')
}

export const errorEventListener = (event: Event & { error: Error }) => {
  /* eslint-disable-next-line no-null/no-null */
  if (globalThis.USER_ERROR_LISTENER_COUNT === 0 && event.error !== null) {
    process.emit('uncaughtException', event.error)
  }
}
