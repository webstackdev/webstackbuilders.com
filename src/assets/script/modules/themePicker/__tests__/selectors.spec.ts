/**
 * Tests for Theme Picker HTML element selectors
 */
import { resolve } from 'path'
import { describe, expect, test } from '@jest/globals'
import { loadHtmlTemplate } from '../../../../../../test/jest/helpers/workers'
import { isButtonElement, isDivElement } from '../../../utils/assertions/elements'
import { getThemePickerItemCard } from './testHelper.spec'
import {
  SELECTORS,
  getThemePickerModalWrapper,
  getThemePickerSelectButtons,
  getThemePickerCloseButton,
  getThemePickerToggleButton,
} from '../selectors'

const templatePath = resolve(process.cwd(), `src/_layouts/components/themePicker/themes.njk`)
let templateDom: string

beforeAll(async () => {
  templateDom = await loadHtmlTemplate(templatePath)
})

const setup = () => {
  document.body.innerHTML = templateDom
  const menu = document.querySelector(`#theme-menu`)!
  menu.innerHTML = getThemePickerItemCard(`default`)
}

describe('getThemePickerModalWrapper selector works', () => {
  test('works against DOM', () => {
    expect(SELECTORS.pickerModal).toMatch(`.themepicker`)
    setup()
    const sut = getThemePickerModalWrapper()
    expect(isDivElement(sut)).toBeTruthy()
    //expect(document.body).toMatchInlineSnapshot()
  })

  test('throws with no results selected against DOM', () => {
    document.body.innerHTML = `span></span>`
    expect(() => getThemePickerModalWrapper()).toThrow()
  })
})

describe('getThemePickerSelectButton selector works', () => {
  test('works against DOM', () => {
    expect(SELECTORS.themeSelectBtns).toMatch(`.themepicker__selectBtn`)
    setup()
    const sut = getThemePickerSelectButtons()
    expect(isButtonElement(sut.item(0))).toBeTruthy()
  })

  test('throws with no results selected against DOM', () => {
    document.body.innerHTML = `span></span>`
    expect(() => getThemePickerSelectButtons()).toThrow()
  })
})

describe('getThemePickerCloseButton selector works', () => {
  test('works against DOM', () => {
    expect(SELECTORS.closeBtn).toMatch(`.themepicker__closeBtn`)
    setup()
    const sut = getThemePickerCloseButton()
    expect(isButtonElement(sut)).toBeTruthy()
  })

  test('throws with no results selected against DOM', () => {
    document.body.innerHTML = `span></span>`
    expect(() => getThemePickerCloseButton()).toThrow()
  })
})

describe('getThemePickerToggleButton selector works', () => {
  test('works against DOM', async () => {
    expect(SELECTORS.toggleBtn).toMatch(`.themepicker-icon__toggle-btn`)
    const toggleTemplatePath = resolve(process.cwd(), `src/_layouts/components/themePicker/icon.njk`)
    document.body.innerHTML = await loadHtmlTemplate(toggleTemplatePath)
    const sut = getThemePickerToggleButton()
    expect(isButtonElement(sut)).toBeTruthy()
  })

  test('throws with no results selected against DOM', () => {
    document.body.innerHTML = `span></span>`
    expect(() => getThemePickerToggleButton()).toThrow()
  })
})
