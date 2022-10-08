/**
 * Type-safe HTML element selectors
 */
import {
  isBodyElement,
  isButtonElement,
  isHtmlElement,
  isNavElement,
  isSlotElement,
  isUlElement,
} from './assertions'


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
 * Getter for the first <nav> HTML element in the document
 */
export const getNavElement = (classSelector: string): HTMLElement => {
  const nav = document.querySelector(classSelector)
  if (!isNavElement(nav)) throw new Error(`<nav> element is missing in document`)
  return nav
}

/**
 * Getter for a <ul> HTML element by class nested inside a provided <nav> element
 */
export const getNavMenuElement = (nav: HTMLElement, classSelector?: string): HTMLUListElement => {
  if (!isNavElement(nav)) throw new Error(
    `<nav> element is missing in document while getting menu elements`
  )
  const selector = classSelector && /^[.#\[]+/.test(classSelector)
    ? `ul${classSelector}`
    : `ul`
  const menu = nav.querySelector(selector)
  if (!isUlElement(menu)) throw new Error(
    `<ul> element is missing under <nav> element in document`
  )
  return menu
}

/**
 * Getter for a <button> HTML element by class nested inside a provided <nav> element
 */
export const getNavMenuToggleBtnElement = (
  nav: HTMLElement,
  classSelector?: string
): HTMLButtonElement => {
  if (!isNavElement(nav)) throw new Error(
    `<nav> element is missing in document while getting menu elements`
  )
  const selector = classSelector && /^[.#\[]+/.test(classSelector)
    ? `button${classSelector}`
    : `button`
  const toggleBtn = nav.querySelector(selector)
  if (!isButtonElement(toggleBtn)) throw new Error(
    `<button> element is missing under <nav> element in document`
  )
  return toggleBtn
}

/**
 * Getter for the first HTML <slot> element from a given shadowroot
 */
export const getSlotElement = (shadowRoot: ShadowRoot): HTMLSlotElement => {
  const slotElement = shadowRoot.querySelector('slot')
  if (!isSlotElement(slotElement)) throw new Error(`<slot> element is missing in shadow root`)
  return slotElement
}
