/**
 * Determine accurate inner dimensions for the window, accounting for device pixel
 * ratio which tells the browser how many of the device's screen actual pixels should
 * be used to draw a single CSS pixel.
 */
export const getWindowDimensions = () => {
  const height = window.innerHeight * window.devicePixelRatio
  const width = window.innerWidth * window.devicePixelRatio
  if (!height || !width) throw new Error(`Window screen size returned zero`)
  return {
    height,
    width,
  }
}
