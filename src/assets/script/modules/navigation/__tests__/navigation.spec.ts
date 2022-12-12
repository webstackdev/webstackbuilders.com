/**
 * Tests for navigation menu script
 */
import { describe, expect, test } from '@jest/globals'
import { resolve } from 'path'
import { getCurriedFixturePath, loadDomWithScript } from '../../../../../../test/jest/helpers'
import { isButtonElement, isNavElement, isUlElement } from '../../../utils/assertions'
import { Navigation, setupNavigation } from '../navigation'

const getFixturePath = getCurriedFixturePath(__dirname)
const templatePath = resolve(process.cwd(), `src/_layouts/components/navigation.njk`)

beforeEach(() => {
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 768,
  })

  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024,
  })

  Object.defineProperty(window, 'devicePixelRatio', {
    writable: true,
    configurable: true,
    value: 1,
  })
})

describe(`Navigation class works`, () => {
  test(`Constructor initializes`, async () => {
    await loadDomWithScript(templatePath, getFixturePath(`navigation_1.ts`), document)
    const sut = new Navigation()
    expect(sut.isOpen).toBeFalsy()
    expect(sut.focusTrap).toMatchObject({
      activate: expect.any(Function),
      active: false,
      deactivate: expect.any(Function),
      pause: expect.any(Function),
      paused: false,
      unpause: expect.any(Function),
      updateContainerElements: expect.any(Function),
    })
    expect(isUlElement(sut.menu)).toBeTruthy()
    expect(isNavElement(sut.nav)).toBeTruthy()
    expect(isButtonElement(sut.toggleBtn)).toBeTruthy()
  })
})

describe(`setupNavigation initialization method works`, () => {
  test(`setupNavigation initializes class and binds successfully`, async () => {
    await loadDomWithScript(templatePath, getFixturePath(`navigation_1.ts`), document)
    const rootElement = document.documentElement
    expect(rootElement.style.getPropertyValue('--diameter')).toBeFalsy()
    setupNavigation()
    expect(rootElement.style.getPropertyValue('--diameter')).toMatch(/1280px/)
  })
})

describe(`Navigation toggleMenu method works`, () => {
  test(`toggleMenu sets class correctly`, async () => {
    await loadDomWithScript(templatePath, getFixturePath(`navigation_1.ts`), document)
    jest.useFakeTimers()
    const sut = new Navigation()
    sut.toggleMenu()
    expect(document.querySelector(`body`)!.className).toMatch(`no-scroll`)
    expect(document.querySelector(`nav`)!.className).toMatch(`main-nav main-nav--open`)
    expect(document.querySelector(`button`)!.getAttribute(`aria-expanded`)).toBeTruthy()
  })
})
