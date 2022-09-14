/**
 * Unhandled exception handler
 */
window.onerror = function (
  msg: string | Event,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error
): true {
  const message: string[] = [`Message: ${msg}`]
  if (source) message.push(`URL: ${source}`)
  if (lineno) message.push(`Line: ${lineno.toString()}`)
  if (colno) message.push(`Column: ${colno.toString()}`)
  if (error) message.push(`Error object: ${JSON.stringify(error)}`)
  console.log('Unhandled exception error:', message.join(' - '))
  /** Prevent the firing of the default event handler */
  return true
}

/**
 * Unhandled rejection handler
 */
window.onunhandledrejection = function (errorEvent: PromiseRejectionEvent): true {
  console.log('Unhandled rejection error:', errorEvent)
  return true
}
