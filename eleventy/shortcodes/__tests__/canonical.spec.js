/**
 * Unit tests for shortcode that determines the canonical URL for a page
 */
const { describe, expect, test } = require('@jest/globals')
const { canonical } = require('../canonical')

describe(`Shortcode for canonical URL`, () => {
  test(`Returns valid URL when passed absolute link`, () => {
    expect(canonical(undefined, `/test/`)).toMatch(
      `https://www.webstackbuilders.com/test/`
    )
  })

  test(`Properly prefixes when passed relative link`, () => {
    expect(canonical(undefined, `test.html`)).toMatch(`https://www.webstackbuilders.com/test.html`)
  })

  test(`Throws if passed a full URL`, () => {
    expect(() => canonical(undefined, `http://example.com`)).toThrow()
  })
})
