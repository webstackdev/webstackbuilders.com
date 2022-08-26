/**
 * Unit tests for page title shortcode
 */
const { pageTitle } = require('../pageTitle')
const { eleventyConfig } = require('../../__fixtures__/eleventyConfig')

describe(`Shortcode for page title`, () => {
  test(`Returns formatted page description and site description when passed`, () => {
    formattedTitleRegex = /.*My Page Title.*My Site Title.*/
    expect(
      pageTitle(eleventyConfig, {
        pageTitle: `My page title`,
      })
    ).toMatch(formattedTitleRegex)
  })
})
