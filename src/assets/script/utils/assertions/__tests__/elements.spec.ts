/**
 * Tests for HTML element type guards
 */
import { describe, expect, test } from '@jest/globals'
import {
  isAnchorElement,
  isBodyElement,
  isButtonElement,
  isDivElement,
  isHtmlElement,
  isImageElement,
  isNavElement,
  isShadowRoot,
  isSlotElement,
  isType1Element,
  isUlElement,
} from '../elements'

const voidFn = () => {}

/* eslint-disable-next-line no-null/no-null */
const nullConst = null

describe('HTML <isType1Element> element assertion', () => {
  test('Valid <isType1Element> element returns true from assertion', () => {
    document.body.innerHTML = `<div></div>`
    const sut = isType1Element(document.querySelector('div'))
    expect(sut).toBeTruthy()
  })

  test('Text node returns false from assertion', () => {
    document.body.innerHTML = `<div></div>`
    const element = document.querySelector('div')
    expect(element).toBeTruthy()
    const sut = isType1Element(element!.textContent)
    expect(sut).toBeFalsy()
  })

  test('Null returns false from assertion', () => {
    const sut = isType1Element(nullConst)
    expect(sut).toBeFalsy()
  })
})

describe('HTML <a> element assertion', () => {
  test('Valid <a> element returns true from assertion', () => {
    document.body.innerHTML = `<a>an anchor</a>`
    const sut = isAnchorElement(document.querySelector('a'))
    expect(sut).toBeTruthy()
  })

  test('Non-<a> element returns false from assertion', () => {
    document.body.innerHTML = `<div><span>a span</span></div>`
    const sut = isAnchorElement(document.querySelector('a'))
    expect(sut).toBeFalsy()
  })

  test('Null returns false from assertion', () => {
    const sut = isAnchorElement(nullConst)
    expect(sut).toBeFalsy()
  })
})

describe('HTML <body> element assertion', () => {
  test('Valid <body> element returns true from assertion', () => {
    document.body.innerHTML = ``
    const sut = isBodyElement(document.querySelector('body'))
    expect(sut).toBeTruthy()
  })

  test('Non-<body> element returns false from assertion', () => {
    document.body.innerHTML = `<div></div>`
    const sut = isBodyElement(document.querySelector('div'))
    expect(sut).toBeFalsy()
  })

  test('Null returns false from assertion', () => {
    const sut = isBodyElement(nullConst)
    expect(sut).toBeFalsy()
  })
})

describe('HTML <button> element assertion', () => {
  test('Valid <body> element returns true from assertion', () => {
    document.body.innerHTML = `<button></button>`
    const sut = isButtonElement(document.querySelector('button'))
    expect(sut).toBeTruthy()
  })

  test('Non-<body> element returns false from assertion', () => {
    document.body.innerHTML = `<div></div>`
    const sut = isButtonElement(document.querySelector('div'))
    expect(sut).toBeFalsy()
  })

  test('Function returns false from assertion', () => {
    const sut = isButtonElement(voidFn)
    expect(sut).toBeFalsy()
  })

  test('Null returns false from assertion', () => {
    const sut = isButtonElement(nullConst)
    expect(sut).toBeFalsy()
  })
})

describe('HTML <div> element assertion', () => {
  test('Valid <body> element returns true from assertion', () => {
    document.body.innerHTML = `<div></div>`
    const sut = isDivElement(document.querySelector('div'))
    expect(sut).toBeTruthy()
  })

  test('Non-<body> element returns false from assertion', () => {
    document.body.innerHTML = `<span></span>`
    const sut = isDivElement(document.querySelector('div'))
    expect(sut).toBeFalsy()
  })

  test('Function returns false from assertion', () => {
    const sut = isDivElement(voidFn)
    expect(sut).toBeFalsy()
  })

  test('Null returns false from assertion', () => {
    const sut = isDivElement(nullConst)
    expect(sut).toBeFalsy()
  })
})

describe('HTML <html> element assertion', () => {
  test('Valid <html> element returns true from assertion', () => {
    document.body.innerHTML = ``
    const sut = isHtmlElement(document.querySelector('html'))
    expect(sut).toBeTruthy()
  })

  test('Non-<html> element returns false from assertion', () => {
    document.body.innerHTML = `<div></div>`
    const sut = isHtmlElement(document.querySelector('div'))
    expect(sut).toBeFalsy()
  })

  test('Function returns false from assertion', () => {
    const sut = isHtmlElement(voidFn)
    expect(sut).toBeFalsy()
  })

  test('Null returns false from assertion', () => {
    const sut = isHtmlElement(nullConst)
    expect(sut).toBeFalsy()
  })
})

describe('HTML <img> element assertion', () => {
  test('Valid <img> element returns true from assertion', () => {
    document.body.innerHTML = `<img src="cover.webp"></img>`
    const sut = isImageElement(document.querySelector('img'))
    expect(sut).toBeTruthy()
  })

  test('Non-<img> element returns false from assertion', () => {
    document.body.innerHTML = `<div></div>`
    const sut = isImageElement(document.querySelector('div'))
    expect(sut).toBeFalsy()
  })

  test('Function returns false from assertion', () => {
    const sut = isImageElement(voidFn)
    expect(sut).toBeFalsy()
  })

  test('Null returns false from assertion', () => {
    const sut = isImageElement(nullConst)
    expect(sut).toBeFalsy()
  })
})

describe('HTML <nav> element assertion', () => {
  test('Valid <nav> element returns true from assertion', () => {
    document.body.innerHTML = `<nav></nav>`
    const sut = isNavElement(document.querySelector('nav'))
    expect(sut).toBeTruthy()
  })

  test('Non-<nav> element returns false from assertion', () => {
    document.body.innerHTML = `<div></div>`
    const sut = isNavElement(document.querySelector('div'))
    expect(sut).toBeFalsy()
  })

  test('Function returns false from assertion', () => {
    const sut = isNavElement(voidFn)
    expect(sut).toBeFalsy()
  })

  test('Null returns false from assertion', () => {
    const sut = isNavElement(nullConst)
    expect(sut).toBeFalsy()
  })
})

describe('HTML Shadow Root element assertion', () => {
  test('Valid <slot> element returns true from assertion', () => {
    document.body.innerHTML = ``
    const body = document.querySelector('body')
    expect(body).toBeTruthy()
    const shadow = body!.attachShadow({ mode: 'open' })
    const sut = isShadowRoot(shadow)
    expect(sut).toBeTruthy()
  })

  test('Non-<slot> element returns false from assertion', () => {
    document.body.innerHTML = `<div></div>`
    const sut = isShadowRoot(document.querySelector('div'))
    expect(sut).toBeFalsy()
  })

  test('Function returns false from assertion', () => {
    const sut = isShadowRoot(voidFn)
    expect(sut).toBeFalsy()
  })

  test('Null returns false from assertion', () => {
    const sut = isShadowRoot(nullConst)
    expect(sut).toBeFalsy()
  })
})

describe('HTML <slot> element assertion', () => {
  test('Valid <slot> element returns true from assertion', () => {
    document.body.innerHTML = `<slot></slot>`
    const sut = isSlotElement(document.querySelector('slot'))
    expect(sut).toBeTruthy()
  })

  test('Non-<slot> element returns false from assertion', () => {
    document.body.innerHTML = `<div></div>`
    const sut = isSlotElement(document.querySelector('div'))
    expect(sut).toBeFalsy()
  })

  test('Function returns false from assertion', () => {
    const sut = isSlotElement(voidFn)
    expect(sut).toBeFalsy()
  })

  test('Null returns false from assertion', () => {
    const sut = isSlotElement(nullConst)
    expect(sut).toBeFalsy()
  })
})

describe('HTML <ul> element assertion', () => {
  test('Valid <ul> element returns true from assertion', () => {
    document.body.innerHTML = `<ul></ul>`
    const sut = isUlElement(document.querySelector('ul'))
    expect(sut).toBeTruthy()
  })

  test('Non-<ul> element returns false from assertion', () => {
    document.body.innerHTML = `<div></div>`
    const sut = isUlElement(document.querySelector('div'))
    expect(sut).toBeFalsy()
  })

  test('Function returns false from assertion', () => {
    const sut = isUlElement(voidFn)
    expect(sut).toBeFalsy()
  })

  test('Null returns false from assertion', () => {
    const sut = isUlElement(nullConst)
    expect(sut).toBeFalsy()
  })
})