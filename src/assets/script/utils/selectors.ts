/**
 * Type-safe HTML element selectors
 */
import {
  isBodyElement,
  isHtmlElement,
  isSlotElement,
} from './assertions/elements'


export const queryDocument = (selector: string): Element => {
  const element = document.querySelector(selector)
  /* eslint-disable-next-line no-null/no-null */
  if (element === null)
    throw new Error(`Could not find document element for query selector ${selector}`)
  return element
}

export const queryAllDocument = (selector: string): NodeListOf<Element> => {
  const elements = document.querySelectorAll(selector)
  if (elements.length === 0)
    throw new Error(`Could not find any document elements for query selector ${selector}`)
  return elements
}

/**
 * Getter for the document <body> HTML element
 */
export const getBodyElement = (): HTMLBodyElement => {
  if (!isBodyElement(document.body))
    throw new Error(`Page is missing a <body> element, is the document empty?`)
  return document.body
}

/**
 * Getter for the document <html> HTML element
 */
export const getHtmlElement = (): HTMLHtmlElement => {
  if (!isHtmlElement(document.documentElement))
    throw new Error(`Page is missing a <html> element, is the document XML or XHTML?`)
  return document.documentElement
}

/**
 * Getter for the first HTML <slot> element from a given shadowroot
 */
export const getSlotElement = (shadowRoot: ShadowRoot): HTMLSlotElement => {
  const slotElement = shadowRoot.querySelector('slot')
  if (!isSlotElement(slotElement)) throw new Error(`<slot> element is missing in shadow root`)
  return slotElement
}
