/**
 * Tests for event listener methods
 */

// restore: @jest-environment-options {"JSDOM_QUIET_MODE": true}
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals'
import {
  getCurriedFixturePath,
  loadDomWithScript,
} from '../../../../../test/jest/helpers/utilities'

const getRelFixturePath = (filename: string) => `src/assets/script/utils/__fixtures__/${filename}`
const getFixturePath = getCurriedFixturePath(__dirname)
const templatePath = getFixturePath(`htmlDoc.njk`)

describe(`delayedLoader fires scripts`, () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  test(`delayedLoader runs script after timeout if no user interaction`, async () => {
    await loadDomWithScript(templatePath, getRelFixturePath(`delayedLoader_1.ts`), document)
    jest.runAllTimers()
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
  })

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
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    jest.runAllTimers()
  })
})
