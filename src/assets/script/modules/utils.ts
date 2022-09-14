/**
 * General client utilities
 */

export const promiseErrorHandler = (_: unknown) => {
  throw new Error()
}

export function isShadowRoot(element: unknown): element is ShadowRoot {
  /* eslint-disable-next-line no-null/no-null */
  return element !== null
}

function isSlotElement(element: HTMLSlotElement | null): element is HTMLSlotElement {
  /* eslint-disable-next-line no-null/no-null */
  return element !== null && element['tagName'] == `SLOT`
}

export const getSlotElement = (shadowRoot: ShadowRoot): HTMLSlotElement => {
  const slotElement = shadowRoot.querySelector('slot')
  if (!isSlotElement(slotElement)) throw new Error(`<slot> element is missing in shadow root`)
  return slotElement
}

function isNavElement(element: Element | null): element is HTMLElement {
  /* eslint-disable-next-line no-null/no-null */
  if (element === null) return false
  return element[`tagName`] === `NAV`
}

export const getNavElement = (classSelector: string): HTMLElement => {
  const nav = document.querySelector(classSelector)
  if (!isNavElement(nav)) throw new Error(`<nav> element is missing in document`)
  return nav
}

function isUlElement(element: Element | null): element is HTMLUListElement {
  /* eslint-disable-next-line no-null/no-null */
  if (element === null) return false
  return element[`tagName`] === `UL`
}

export const getNavMenuElement = (nav: HTMLElement, classSelector: string): HTMLUListElement => {
  const menu = nav.querySelector(classSelector)
  if (!isUlElement(menu))
    throw new Error(`<ul> element is missing under <nav> element in document`)
  return menu
}

function isButtonElement(element: Element | null): element is HTMLButtonElement {
  /* eslint-disable-next-line no-null/no-null */
  if (element === null) return false
  return element[`tagName`] === `BUTTON`
}

export const getNavMenuToggleBtnElement = (nav: HTMLElement, classSelector: string): HTMLButtonElement => {
  const toggleBtn = nav.querySelector(classSelector)
  if (!isButtonElement(toggleBtn))
    throw new Error(`<button> element is missing under <nav> element in document`)
  return toggleBtn
}

function isHtmlElement(element: Element | null): element is HTMLHtmlElement {
  /* eslint-disable-next-line no-null/no-null */
  if (element === null) return false
  return element[`tagName`] === `HTML`
}

export const getHtmlElement = (): HTMLHtmlElement => {
  if (!isHtmlElement(document.documentElement))
    throw new Error(`Page is missing a <html> element, is the document XML or XHTML?`)
  return document.documentElement
}

function isBodyElement(element: Element | null): element is HTMLBodyElement {
  /* eslint-disable-next-line no-null/no-null */
  if (element === null) return false
  return element[`tagName`] === `BODY`
}

export const getBodyElement = (): HTMLBodyElement => {
  if (!isBodyElement(document.body))
    throw new Error(`Page is missing a <body> element, is the document empty?`)
  return document.body
}

/**
 * Determine accurate inner dimensions for the window
 */
export const getWindowDimensions = () => {
  const htmlElement = getHtmlElement()
  const bodyElement = getBodyElement()
  return {
    width: window.innerWidth || htmlElement.clientWidth || bodyElement.clientWidth,
    height: window.innerHeight || htmlElement.clientHeight || bodyElement.clientHeight,
  }
}
