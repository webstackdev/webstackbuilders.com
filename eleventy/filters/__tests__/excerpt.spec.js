/**
 * Integration test for excerpt filter. Filter splits the content into
 * excerpt and remainder on the excerpt separator '<!--more-->'.
 * Usage:
 * {{ post.templateContent | excerpt | striptags }}
 */
const { describe, expect, test } = require('@jest/globals')
const path = require('path')
const EleventyProgrammatic = require('@11ty/eleventy')
const configPath = path.resolve('./.eleventy.js')
const templateFixturePath = path.resolve(`eleventy/filters/__fixtures__/excerpt.11ty.js`)

describe(`excerpt filter tests`, () => {
  test.skip(`excerpt filter passes integration test`, async () => {
    let results = new EleventyProgrammatic(templateFixturePath, `_`, {
      quietMode: true,
      configPath,
      /*config: function (eleventyConfig) {
        eleventyConfig.setFrontMatterParsingOptions({
          excerpt: true,
          excerpt_separator: '<!-- excerpt -->',
        })
      },*/
    })
    let jsonResults = await results.toJSON()
    expect(jsonResults).toMatchInlineSnapshot(`using eleventy programmatic isn't returning the excerpt separately, not sure how to get it to`)
  })
})
