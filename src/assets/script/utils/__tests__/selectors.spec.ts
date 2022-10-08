/**
 * Tests for HTML element selectors
 */
import { describe, expect, test } from '@jest/globals'
import {
  isBodyElement,
  isButtonElement,
  isHtmlElement,
  isNavElement,
  isSlotElement,
  isType1Element,
  isUlElement,
} from '../assertions'
import {
  getBodyElement,
  getHtmlElement,
  getNavElement,
  getNavMenuElement,
  getNavMenuToggleBtnElement,
  getSlotElement,
  queryDocument,
  queryAllDocument,
} from '../selectors'

describe('Generic selectors work', () => {
  test('Generic queryDocument works with valid selector against DOM', () => {
    document.body.innerHTML = `<div></div>`
    const sut = isType1Element(queryDocument('div'))
    expect(sut).toBeTruthy()
  })

  test('Generic queryDocument throws with no results selected against DOM', () => {
    document.body.innerHTML = `<span></span>`
    expect(() => queryDocument('div')).toThrow()
  })

  test('Generic queryAllDocument works with valid selector against DOM', () => {
    document.body.innerHTML = `<div></div><div></div>`
    const sut = queryAllDocument('div')
    expect(sut).toHaveLength(2)
    expect(isType1Element(sut[0])).toBeTruthy()
    expect(isType1Element(sut[1])).toBeTruthy()
  })

  test('Generic queryAllDocument throws with no results selected against DOM', () => {
    document.body.innerHTML = `<span></span>`
    expect(() => queryAllDocument('div')).toThrow()
  })
})

describe('getBodyElement selector works', () => {
  test('getBodyElement works with valid selector against DOM', () => {
    document.body.innerHTML = `<span></span>`
    const sut = isBodyElement(getBodyElement())
    expect(sut).toBeTruthy()
  })
})

describe('getHtmlElement selector works', () => {
  test('getHtmlElement works with valid selector against DOM', () => {
    document.body.innerHTML = `<span></span>`
    const sut = isHtmlElement(getHtmlElement())
    expect(sut).toBeTruthy()
  })
})

describe('getNavElement selector works', () => {
  test(' works with valid selector against DOM', () => {
    document.body.innerHTML = `<nav class="test-nav" role="navigation"></nav>`
    const sut = isNavElement(getNavElement('.test-nav'))
    expect(sut).toBeTruthy()
  })

  test(' throws with no results selected against DOM', () => {
    document.body.innerHTML = `<span></span>`
    expect(() => getNavElement('.test-nav')).toThrow()
  })
})

describe('getNavMenuElement selector works', () => {
  const fullNav = `<nav class="test-nav" role="navigation"><ul class="test-nav-menu"></ul></nav>`

  test('getNavElement works with valid class selector against DOM', () => {
    document.body.innerHTML = fullNav
    const nav = getNavElement('.test-nav')
    const sut = getNavMenuElement(nav, '.test-nav-menu')
    expect(isUlElement(sut)).toBeTruthy()
  })

  test('getNavElement works with nested LI items and no class selector against DOM', () => {
    document.body.innerHTML = fullNav
    const nav = getNavElement('.test-nav')
    const sut = getNavMenuElement(nav)
    expect(isUlElement(sut)).toBeTruthy()
  })

  test('getNavElement throws with no results selected against DOM', () => {
    document.body.innerHTML = `<nav class="test-nav" role="navigation"></nav>`
    const nav = getNavElement('.test-nav')
    expect(() => getNavMenuElement(nav)).toThrow()
  })
})

describe('getNavMenuToggleBtnElement selector works', () => {
  const fullNav = `
  <nav class="test-nav" role="navigation"><button class="test-nav-button"></button></nav>`

  test('getNavMenuToggleBtnElement works with valid class selector against DOM', () => {
    document.body.innerHTML = fullNav
    const nav = getNavElement('.test-nav')
    const sut = getNavMenuToggleBtnElement(nav, '.test-nav-button')
    expect(isButtonElement(sut)).toBeTruthy()
  })

  test('getNavMenuToggleBtnElement works with nested LI items and no class selector against DOM', () => {
    document.body.innerHTML = fullNav
    const nav = getNavElement('.test-nav')
    const sut = getNavMenuToggleBtnElement(nav)
    expect(isButtonElement(sut)).toBeTruthy()
  })

  test('getNavMenuToggleBtnElement throws with no results selected against DOM', () => {
    document.body.innerHTML = `<nav class="test-nav" role="navigation"></nav>`
    const nav = getNavElement('.test-nav')
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
