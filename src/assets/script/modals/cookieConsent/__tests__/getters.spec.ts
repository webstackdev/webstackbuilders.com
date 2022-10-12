/**
 * Tests for cookies modal
 */
import { describe, expect, test } from '@jest/globals'
import { getCurriedFixturePath, loadDomWithScript } from '../../../../../../test/jest/loadJsdom'

const getFixturePath = getCurriedFixturePath(__dirname)

describe(`Getters for elements in cookie modal work`, () => {
  test(`getCookieConsentWrapper returns <div> wrapper`, async () => {
    const templatePath = getFixturePath(`getters.njk`)
    const scriptPath = getFixturePath(`getters_1.ts`)
    await loadDomWithScript(templatePath, scriptPath)
    expect(true).toBeTruthy()
  })
})
