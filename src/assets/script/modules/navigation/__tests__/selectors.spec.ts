/**
 * Tests for HTML element selectors
 */
import { describe, expect, test } from '@jest/globals'
import {
  isBodyElement,
  isButtonElement,
  isNavElement,
  isSlotElement,
  isUlElement,
} from '../../../utils/assertions/elements'
import {
  getNavElement,
  getNavMenuElement,
  getNavMenuToggleBtnElement,
} from '../selectors'
import { getSlotElement } from '../../../utils/selectors'
import { navHtml } from '../__fixtures__/navigationHtml'

describe('getNavElement selector works', () => {
  test(' works with valid selector against DOM', () => {
    document.body.innerHTML = navHtml
    const sut = isNavElement(getNavElement('.main-nav'))
    expect(sut).toBeTruthy()
  })

  test(' throws with no results selected against DOM', () => {
    document.body.innerHTML = `<span></span>`
    expect(() => getNavElement('.main-nav')).toThrow()
  })
})

describe('getNavMenuElement selector works', () => {
  test('getNavElement works with valid class selector against DOM', () => {
    document.body.innerHTML = navHtml
    const nav = getNavElement('.main-nav')
    const sut = getNavMenuElement(nav, '.main-nav__menu')
    expect(isUlElement(sut)).toBeTruthy()
  })

  test('getNavElement works with nested LI items and no class selector against DOM', () => {
    document.body.innerHTML = navHtml
    const nav = getNavElement('.main-nav')
    const sut = getNavMenuElement(nav)
    expect(isUlElement(sut)).toBeTruthy()
  })

  test('getNavElement throws with no results selected against DOM', () => {
    document.body.innerHTML = `<nav class="main-nav" role="navigation"></nav>`
    const nav = getNavElement('.main-nav')
    expect(() => getNavMenuElement(nav)).toThrow()
  })
})

describe('getNavMenuToggleBtnElement selector works', () => {
  test('getNavMenuToggleBtnElement works with valid class selector against DOM', () => {
    document.body.innerHTML = navHtml
    const nav = getNavElement('.main-nav')
    const sut = getNavMenuToggleBtnElement(nav, '.main-nav__toggleBtn')
    expect(isButtonElement(sut)).toBeTruthy()
  })

  test('getNavMenuToggleBtnElement works with nested LI items and no class selector against DOM', () => {
    document.body.innerHTML = navHtml
    const nav = getNavElement('.main-nav')
    const sut = getNavMenuToggleBtnElement(nav)
    expect(isButtonElement(sut)).toBeTruthy()
  })

  test('getNavMenuToggleBtnElement throws with no results selected against DOM', () => {
    document.body.innerHTML = `<nav class="main-nav" role="navigation"></nav>`
    const nav = getNavElement('.main-nav')
    expect(() => getNavMenuToggleBtnElement(nav)).toThrow()
  })
})

describe('getNavMenuToggleBtnElement selector works', () => {
  test('getNavMenuToggleBtnElement works with valid class selector against DOM', () => {
    const body = document.querySelector('body')
    expect(isBodyElement(body)).toBeTruthy()
    const shadow = (body as HTMLBodyElement).attachShadow({ mode: 'open' })
    shadow.innerHTML = `<slot></slot>`
    const sut = getSlotElement(shadow)
    expect(isSlotElement(sut)).toBeTruthy()
  })

  test('getNavMenuToggleBtnElement throws with no <slot> elements in the shadow DOM', () => {
    const body = document.querySelector('body')
    expect(isBodyElement(body)).toBeTruthy()
    const shadow = (body as HTMLBodyElement).attachShadow({ mode: 'open' })
    expect(() => getSlotElement(shadow)).toThrow()
  })
})
