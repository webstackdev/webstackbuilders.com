import { describe, expect, test } from '@jest/globals'
import {
  consentModalStateKey,
  isVisibilityObject,
  getCookieModalVisibility,
  setCookieModalVisibility,
  initCookieModalVisibility,
} from '../localStorage/consentModal'

const getMockedStoreValue = () => localStorage['__STORE__'][consentModalStateKey]

describe(`local storage getters / setters for visibility work`, () => {
  test(`isVisibilityObject type guard returns true with valid input`, () => {
    expect(isVisibilityObject({ visible: true })).toBeTruthy()
  })

  test(`isVisibilityObject type guard returns false with invalid input`, () => {
    expect(isVisibilityObject(undefined)).toBeFalsy()
    expect(isVisibilityObject(``)).toBeFalsy()
    expect(isVisibilityObject({})).toBeFalsy()
  })

  test(`it returns true from local storage when set to true`, () => {
    localStorage.clear()
    jest.clearAllMocks()
    localStorage.setItem(`COOKIE_MODAL_VISIBLE`, JSON.stringify({ visible: true }))
    expect(getCookieModalVisibility()).toBeTruthy()
  })

  test(`it returns false from local storage when set to false`, () => {
    localStorage.clear()
    jest.clearAllMocks()
    localStorage.setItem(`COOKIE_MODAL_VISIBLE`, JSON.stringify({ visible: false }))
    expect(getCookieModalVisibility()).toBeFalsy()
  })

  test(`it sets local storage`, () => {
    localStorage.clear()
    jest.clearAllMocks()
    localStorage.setItem(`COOKIE_MODAL_VISIBLE`, JSON.stringify({ visible: false }))
    setCookieModalVisibility(true)
    expect(getMockedStoreValue()).toMatch(`{"visible":true}`)
  })

  test(`it initializes local storage`, () => {
    localStorage.clear()
    jest.clearAllMocks()
    initCookieModalVisibility()
    expect(getMockedStoreValue()).toMatch(`{"visible":true}`)
  })
})
