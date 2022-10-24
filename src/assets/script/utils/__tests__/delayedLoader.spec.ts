/**
 * Tests for event listener methods
 */

// restore: @jest-environment-options {"JSDOM_QUIET_MODE": true}
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals'
import {
  getCurriedFixturePath,
  loadDomWithScript,
} from '../../../../../test/jest/helpers/loadJsdom'

const getRelFixturePath = (filename: string) => `src/assets/script/utils/__fixtures__/${filename}`
const getFixturePath = getCurriedFixturePath(__dirname)
const templatePath = getFixturePath(`delayedLoader.njk`)

describe(`delayedLoader fires scripts`, () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  test.skip(`delayedLoader runs script after timeout if no user interaction`, async () => {
    await loadDomWithScript(templatePath, getRelFixturePath(`delayedLoader_1.ts`), document)
    jest.runAllTimers()
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
  })

  test.skip(`delayedLoader test`, async () => {
    await loadDomWithScript(templatePath, getRelFixturePath(`delayedLoader_1.ts`), document)
    const body = document.querySelector(`body`)!
    body.innerHTML = `<span>TEST</span>`
    const span = document.querySelector(`span`)!
    const event = new Event('mousemove')
    span.dispatchEvent(event)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
  })

  test(`delayedLoader test`, async () => {
    await loadDomWithScript(templatePath, getRelFixturePath(`test_1.ts`), document)
    const body = document.querySelector(`body`)!
    const event = new Event('mousemove')
    body.dispatchEvent(event)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
  })

  /*
  const cases = [
    [`keypress`, `delayedLoader_2_1.ts`],
    [`mouse move`, `delayedLoader_2_2.ts`],
    [`wheel move`, `delayedLoader_2_3.ts`],
    [`touch move`, `delayedLoader_2_4.ts`],
    [`touch start`, `delayedLoader_2_5.ts`],
    [`touch end`, `delayedLoader_2_6.ts`],
  ]

  test.each(cases)('delayedLoader runs script after %s', async (_, scriptFilename) => {
    await loadDomWithScript(templatePath, getRelFixturePath(scriptFilename), document)
    expect(document.querySelectorAll(`hr`)).toHaveLength(1)
    jest.runAllTimers()
  })
  */
})
