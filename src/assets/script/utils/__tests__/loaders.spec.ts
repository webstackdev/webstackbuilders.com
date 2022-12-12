/**
 * Tests for event listener loader methods
 */
import { describe, expect, test } from '@jest/globals'
import {
  getCurriedFixturePath,
  loadDomWithScript,
} from '../../../../../test/jest/helpers/utilities'

const getRelFixturePath = (filename: string) => `src/assets/script/utils/__fixtures__/${filename}`
const getFixturePath = getCurriedFixturePath(__dirname)
const templatePath = getFixturePath(`htmlDoc.njk`)

describe(`Lifecycle event listeners work`, () => {
  test(`addLoadedEventListeners`, async () => {
    await loadDomWithScript(templatePath, getRelFixturePath(`loaders_1.ts`), document)
    const event = new Event(`load`)
    window.dispatchEvent(event)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
  })


  test(`addDomLoadedEventListeners`, async () => {
    await loadDomWithScript(templatePath, getRelFixturePath(`loaders_2.ts`), document)
    const event = new Event(`DOMContentLoaded`)
    window.dispatchEvent(event)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
  })


  test(`addAllLoaderEventListeners`, async () => {
    await loadDomWithScript(templatePath, getRelFixturePath(`loaders_3.ts`), document)
    const loadEvent = new Event(`load`)
    window.dispatchEvent(loadEvent)
    const domLoadedEvent = new Event(`DOMContentLoaded`)
    window.dispatchEvent(domLoadedEvent)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
  })
})
