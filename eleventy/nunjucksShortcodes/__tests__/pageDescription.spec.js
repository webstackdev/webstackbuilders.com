/**
 * Unit tests for page description shortcode
 */
const { pageDescription } = require('../pageDescription')
const { eleventyConfig } = require('../../__fixtures__/eleventyConfig')

describe(`Shortcode for page description`, () => {
  test(`Returns page description if it is passed`, () => {
    expect(
      pageDescription(eleventyConfig, {
        pageDescription: `My page description`,
        siteTitle: `My site title`,
      })
    ).toBe(`My page description`)
  })

  test(`Sets page description to site title if no page description is passed`, () => {
    expect(pageDescription(eleventyConfig, { siteTitle: `My site title` })).toBe(`My site title`)
  })
})
