/**
 * Unit and integration test for humanize number filter.
 * This filter prints high numbers with a "K" suffix.
 *
 * Usage:
 *   {{ 1000 | humanizeNumber }}
 */
const path = require(`path`)
const { eleventyProgrammatic } = require('../../../test/11tyProgrammatic')

describe(`humanize number filter tests`, () => {
  test(`humanize number filter passes integration test`, async () => {
    const humanizeNumberJson = await eleventyProgrammatic(
      path.resolve(`eleventy/filters/tests/fixtures/humanizeNumber.11ty.js`)
    )
    expect(humanizeNumberJson.shift()).toMatchObject({
      content: expect.stringMatching(/1K/),
    })
  })
})
