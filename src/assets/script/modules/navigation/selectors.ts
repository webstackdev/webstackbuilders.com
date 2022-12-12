/**
 * Type-safe HTML element selectors
 */
import {
  isButtonElement,
  isNavElement,
  isUlElement,
} from '../../utils/assertions/elements'

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
  if (!isNavElement(nav))
    throw new Error(`<nav> element is missing in document while getting menu elements`)
  const selector = classSelector && /^[.#\[]+/.test(classSelector) ? `ul${classSelector}` : `ul`
  const menu = nav.querySelector(selector)
  if (!isUlElement(menu)) throw new Error(`<ul> element is missing under <nav> element in document`)
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
