/**
 * @jest-environment-options {"JSDOM_QUIET_MODE": true}
 *
 * Tests for cookies modal getters
 */
import { resolve } from 'path'
import { describe, expect, test } from '@jest/globals'
import { getByTestId } from '@testing-library/dom'
import { getCurriedFixturePath, loadDomWithScript } from '../../../../../../test/jest/helpers'

const getFixturePath = getCurriedFixturePath(__dirname)
const sutTemplatePath = resolve(process.cwd(), `src/_layouts/modals/cookieConsent.njk`)

describe(`getCookieConsentWrapper for elements in cookie modal work`, () => {
  test(`it returns <div> wrapper`, async () => {
    const scriptPath = getFixturePath(`getters_1.ts`)
    await loadDomWithScript(sutTemplatePath, scriptPath, document)
    const body = document.querySelector(`body`)!
    // @ts-ignore jest extended types aren't working correctly
    expect(getByTestId(body, 'test-element')).toBeInTheDocument()
  })

  test(`it throws if no <div> wrapper`, async () => {
    const templatePath = getFixturePath(`getters.njk`)
    const scriptPath = getFixturePath(`getters_1.ts`)
    await loadDomWithScript(templatePath, scriptPath, document)
    const body = document.querySelector(`body`)!
    expect(body.innerHTML).toMatch(
      `Cookie consent modal wrapper with id 'cookie-modal-id' not found`
    )
  })
})
