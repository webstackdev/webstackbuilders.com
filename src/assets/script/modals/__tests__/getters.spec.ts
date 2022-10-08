/**
 * Tests for cookies modal
 */
import { resolve } from 'path'
import { describe, expect, test } from '@jest/globals'
import { setImmediate } from 'timers'
import { getFixturePath, loadDomWithScript } from '../../../../../../test/jest/loadJsdom'
import { getCookieConsentWrapper } from '..'

const templatePath = resolve(`src/_layouts/components/cookies.njk`)

describe(``, () => {
  test(``, () => {
    const element = getCookieConsentWrapper
    expect().toMatchInlineSnapshot()
  })
})
