/**
 * Determine accurate inner dimensions for the window
 */
import { getBodyElement, getHtmlElement } from './selectors'

export const getWindowDimensions = () => {
  const htmlElement = getHtmlElement()
  const bodyElement = getBodyElement()
  return {
    width: window.innerWidth || htmlElement.clientWidth || bodyElement.clientWidth,
    height: window.innerHeight || htmlElement.clientHeight || bodyElement.clientHeight,
  }
}
