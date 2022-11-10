/// <reference path="../../../../../../@types/@jest/globals/expect.d.ts" />
/**
 * @jest-environment-options {"JSDOM_QUIET_MODE": true}
 *
 * Tests for cookies modal getters
 */
import { resolve } from 'path'
import { afterEach, beforeEach, describe, expect, test } from '@jest/globals'
import { getByTestId } from '@testing-library/dom'
import {
  loadDom,
  getCurriedFixturePath,
  loadDomWithScript,
} from '../../../../../../test/jest/helpers'

const getFixturePath = getCurriedFixturePath(__dirname)
//const sutTemplatePath = resolve(process.cwd(), `src/_layouts/modals/cookieConsent.njk`)

describe(`Getters for elements in cookie modal work`, () => {
  beforeEach(() => {
    //jest.useFakeTimers()
  })

  afterEach(() => {
    //jest.runOnlyPendingTimers()
    //jest.useRealTimers()
  })

  test.only(
    `experiment`,
    async () => {
      //jest.setTimeout(1000 * 60)
      //const scriptPath = getFixturePath(`getters_1.ts`)
      const templatePath = resolve(`src/_layouts/modals/cookieConsent.njk`)

      await loadDom(templatePath, document)

      const body = document.querySelector(`body`)
      expect(body).toMatchInlineSnapshot(`
        <body>
          undefined
        </body>
      `)
    },
    1000 * 600
  )

  test(`getCookieConsentWrapper returns <div> wrapper`, async () => {
    const scriptPath = getFixturePath(`getters_1.ts`)
    const sutTemplatePath = resolve(`src/_layouts/modals/cookieConsent.njk`)
    await loadDomWithScript(sutTemplatePath, scriptPath, document)
    const body = document.querySelector(`body`)!
    // @ts-ignore jest extended types aren't workign correctly
    expect(getByTestId(body, 'test-element')).toBeInTheDocument()
  })

  test(`getCookieConsentWrapper throws if no <div> wrapper`, async () => {
    const templatePath = getFixturePath(`getters.njk`)
    const scriptPath = getFixturePath(`getters_1.ts`)
    await loadDomWithScript(templatePath, scriptPath, document)
    const body = document.querySelector(`body`)!
    expect(body.innerHTML).toMatch(
      `Cookie consent modal wrapper with id 'cookie-modal-id' not found`
    )
  })
})
