/**
 * Integration test for markdown-it CommonMark rules, GFM tables, and GFM strikethrough
 */
const { queryByText } = require(`@testing-library/dom`)

const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`leading and trailing dash adds underline to text`, () => {
  test.skip(`single asterisk generates HTML <> tags`, () => {
    document.body.innerHTML = markdownItLib.render(`_underlined_`)
    expect(queryByText(document, /underlined/).nodeName === `U`).toBeTruthy()
  })

  test.skip(`underline passes accessibility check`, async () => {
    document.body.innerHTML = markdownItLib.render(`_underlined_`)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
