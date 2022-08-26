/**
 * Integration tests for async image handler
 */
const { asyncImageHandler } = require('./')

describe(`Async image handler tests`, () => {
  test('Gets correct path for absolute path parameter', async () => {
    // Nunjucks provides shortcodes with a `this` parameter including page url
    const element = await asyncImageHandler.call(
      { page: { url: '/' } },
      null,
      '/avatars/test-red-dot.png',
      'test red dot alt text'
    )
    expect(element).toMatchSnapshot()
  })
})
