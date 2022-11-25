/**
 * Smoke tests for async image handler
 */
const { describe, expect, test } = require('@jest/globals')
const { asyncImageHandler } = require('../handler')

describe(`Async image handler tests`, () => {
  test('Gets correct path for absolute path parameter and no lazy load', async () => {
    // Nunjucks provides shortcodes with a `this` parameter including page url
    const element = await asyncImageHandler.call(
      { page: { filePathStem: '/pages/articles/helloworld/index' } },
      undefined,
      '/avatars/test-red-dot.png',
      'test red dot alt text'
    )
    expect(element).toMatchSnapshot()
  })

  test('Gets correct path for absolute path parameter with lazy load', async () => {
    // Nunjucks provides shortcodes with a `this` parameter including page url
    const element = await asyncImageHandler.call(
      { page: { filePathStem: '/pages/articles/helloworld/index' } },
      undefined,
      '/avatars/test-red-dot.png',
      'test red dot alt text',
      true
    )
    expect(element).toMatchSnapshot()
  })
})
