/**
 * Tests for cookies modal
 */
import { resolve } from 'path'
import { describe, expect, test } from '@jest/globals'
import { setImmediate } from 'timers'
import { getFixturePath, loadDomWithScript } from '../../../../../../test/jest/loadJsdom'
import { getCookieConsentWrapper } from '../cookieConsent'

global.setImmediate = setImmediate

const templatePath = resolve(`src/_layouts/components/cookies.njk`)

describe('Sets cookie modal visible', () => {
  test.only('Gets the modal <div> wrapper', () => {
    const element = getCookieConsentWrapper
    expect(json.content).toMatchInlineSnapshot()
  })

  test('', () => {
    const cookieConsentModal = document.getElementById(`cookie-modal-id`)
    cookieConsentModal.style.display = `none` // set by CSS in production
    //expect(json.content).toMatchInlineSnapshot()
  })
})
