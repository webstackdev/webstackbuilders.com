/**
 * Unit tests for shortcode that Formats a phone number in numeric format
 */
const { describe, expect, test } = require('@jest/globals')
const { formatPhoneNumber } = require('../formatPhoneNumber')

describe(`Shortcode to format numeric phone number`, () => {
  test(`Returns human formatted phone number when passed numeric number`, () => {
    expect(formatPhoneNumber(undefined, `+12133734253`)).toMatch(`(213) 373-4253`)
  })
})
