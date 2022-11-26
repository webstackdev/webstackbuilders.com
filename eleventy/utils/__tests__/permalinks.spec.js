const { describe, expect, test } = require('@jest/globals')
const { getPermalinkPath, normalizeFilePathStem } = require('../permalinks')

describe(`Format the file path stem given by Eleventy`, () => {
  test(`Strips build dir, leading slash, and trailing file name`, () => {
    const rawFilePathStem = `/pages/articles/helloworld/index`
    expect(normalizeFilePathStem(rawFilePathStem)).toBe(`articles/helloworld/`)
  })
})

describe(`Builds a permalink from the page object provided by Eleventy`, () => {
  test(`Strips build dir, leading slash, and trailing file name`, () => {
    const data = {
      page: {
        filePathStem: `/pages/articles/helloworld/index`,
        fileSlug: `helloworld`,
        outputFileExtension: `html`,
      },
    }
    expect(getPermalinkPath(data)).toBe(`articles/helloworld/`)
  })
})
