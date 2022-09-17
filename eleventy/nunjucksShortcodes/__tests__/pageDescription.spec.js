/**
 * Unit tests for page description shortcode
 */
const { pageDescription } = require('../pageDescription')
const { eleventyConfig } = require('../../__fixtures__/eleventyConfig')

describe(`Shortcode for page description`, () => {
  test(`Returns page description if it is passed`, () => {
    expect(
      pageDescription(eleventyConfig, `My page description`)
    ).toBe(`My page description`)
  })

  test(`Sets page description to site title if no page description is passed`, () => {
    expect(pageDescription(eleventyConfig)).toBe(`My site title`)
  })
})
