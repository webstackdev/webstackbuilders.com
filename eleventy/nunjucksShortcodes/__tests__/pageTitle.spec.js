/**
 * Unit tests for page title shortcode
 */
const { describe, expect, test } = require('@jest/globals')
const { pageTitle } = require('../pageTitle')
const { eleventyConfig } = require('../../__fixtures__/eleventyConfig')

describe(`Shortcode for page title`, () => {
  test(`Returns formatted page description and site description when passed`, () => {
    const formattedTitleRegex = /.*My Page Title.*My Site Title.*/
    expect(
      pageTitle(eleventyConfig, `My page title`)
    ).toMatch(formattedTitleRegex)
  })
})
