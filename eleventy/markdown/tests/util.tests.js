const { slugifyTitleAnchors } = require('../util')

describe(`Title anchors are properly slugified`, () => {
  test(`spaces are converted to dashes and the text string is lowercased`, () => {
    const result = slugifyTitleAnchors(`This is my title or heading text`)
    expect(result).toBe(`this-is-my-title-or-heading-text`)
  })

  test(`leading and trailing whitespace is removed`, () => {
    const result = slugifyTitleAnchors(` My title `)
    expect(result).toBe(`my-title`)
  })

  test(`ampersand symbols are converted to text`, () => {
    const result = slugifyTitleAnchors(`Cat & Dog`)
    expect(result).toBe(`cat-and-dog`)
  })

  test(`multiple dashes are collapsed to a single dash`, () => {
    const result = slugifyTitleAnchors(`Cat -- Dog`)
    expect(result).toBe(`cat-dog`)
  })

  test(`leading and trailing dashes are removed`, () => {
    const result = slugifyTitleAnchors(`--Cats--`)
    expect(result).toBe(`cats`)
  })

  test(`backticks are removed`, () => {
    const result = slugifyTitleAnchors('`Punctuation`')
    expect(result).toBe(`punctuation`)
  })

  test(`other punctuation is removed`, () => {
    const result = slugifyTitleAnchors(`Punctuation: .,\/#!$%\^\*;{}=_~()`)
    expect(result).toBe(`punctuation`)
  })
})
