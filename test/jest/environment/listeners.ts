

export const addEventHandlerArgsProcessor = (
  args: Parameters<typeof globalThis.addEventListener>
) => {
  if (args[0] === 'error') globalThis.USER_ERROR_LISTENER_COUNT++
}

export const removeEventHandlerArgsProcessor = (
  args: Parameters<typeof globalThis.addEventListener>
) => {
  if (args[0] === 'error') globalThis.USER_ERROR_LISTENER_COUNT--
}