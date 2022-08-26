/**
 * Unit tests for shortcode for social image for page
 */
const { pageSocialImg } = require('../pageSocialImg')
const { eleventyConfig } = require('../../__fixtures__/eleventyConfig')

describe(`Shortcode for social image for page`, () => {
  test(`Returns link for social image for page`, () => {
    expect(
      pageSocialImg(eleventyConfig, {
        siteUrl: `https://local.test`,
        slug: `my-page`,
      })
    ).toBe(`https://local.test/previews/my-page.png`)
  })

  test(`Returns link to home page social image if slug not given`, () => {
    expect(
      pageSocialImg(eleventyConfig, {
        siteUrl: `https://local.test`,
      })
    ).toBe(`https://local.test/previews/home.png`)
  })
})