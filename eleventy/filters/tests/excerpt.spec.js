/**
 * Integration test for excerpt filter. Filter splits the content into
 * excerpt and remainder on the excerpt separator '<!--more-->'.
 * Usage:
 *   {{ post.templateContent | excerpt | striptags }}
 */
const path = require(`path`)
const { eleventyProgrammatic } = require('../../../test/11tyProgrammatic')

describe(`excerpt filter tests`, () => {
  test.skip(`excerpt filter passes integration test`, async () => {
    const excerptJson = await eleventyProgrammatic(
      path.resolve(`eleventy/filters/tests/fixtures/excerpt.11ty.js`)
    )
    expect(excerptJson).toMatchInlineSnapshot()
  })
})
