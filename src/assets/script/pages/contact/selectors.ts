/**
 * Type-safe HTML element selectors
 */
import {
  isButtonElement,
  isDivElement,
  isHeaderElement,
  isSpanElement,
  isUlElement,
} from '../../utils/assertions/elements'

export const SELECTORS = {
  /** Site main <header> */
  header: '#header',
}

/**
 * Getter for the header <span> HTML element that wraps the menu
 */
export const getHeaderElement = (): HTMLElement => {
  const header = document.querySelector(SELECTORS.header)
  if (!isHeaderElement(header)) {
    throw new Error(`Site main <header> is missing in document, selector: ${SELECTORS.header}`)
  }
  return header
}
