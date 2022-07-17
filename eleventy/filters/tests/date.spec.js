/**
 * Unit and integration test for format date filter.
 *
 * Usage:
 *   {{ build.timestamp | dateToFormat('yyyy') }}
 */
const path = require(`path`)
const { eleventyProgrammatic } = require('../../../test/11tyProgrammatic')

describe(`format date filter tests`, () => {
  test(`format date filter passes integration test`, async () => {
    const dateToFormatJson = await eleventyProgrammatic(
      path.resolve(`eleventy/filters/tests/fixtures/dateToFormat.11ty.js`)
    )
    expect(dateToFormatJson).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "<p>Invalid DateTime</p>
      ",
          "inputPath": "/home/kevin/Repos/webstackdev/eleventy.webstackbuilders.com/eleventy/filters/tests/fixtures/dateToFormat.11ty.js",
          "outputPath": "public/dateToFormat/index.html",
          "url": "/dateToFormat/",
        },
      ]
    `)
  })
})
