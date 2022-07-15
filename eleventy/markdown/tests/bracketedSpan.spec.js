/**
 * Integration test for bracketed span markdown plugin. This plugin allows adding
 * a <span> wrapper around content that is enclosed in brackets in Markdown.
 */
const { queryAllByRole, queryByRole, queryByText } = require(`@testing-library/dom`)
const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`adds <span> element to markdown content in brackets`, () => {
  test(`adds span to bracketed content, used with attributes plugin`, () => {
    document.body.innerHTML = markdownItLib.render(`paragraph with [my span]{.test}`)
    const spanElement = queryByText(document.body, /my span/i)
    expect(spanElement).not.toBeNull()
    expect(spanElement).toHaveClass(`test`)
  })

  test(`renders inline markup in bracketed content`, () => {
    document.body.innerHTML = markdownItLib.render(`foo [bar *baz*]{.test}`)
    const spanElement = queryByText(document.body, /baz/i)
    expect(spanElement).not.toBeNull()
    expect(spanElement.nodeName === `EM`).toBeTruthy()
  })

  test(`renders bracket without following curly brackets as literals`, () => {
    document.body.innerHTML = markdownItLib.render(`foo [bar *baz*]`)
    const spanElement = queryByText(document.body, /\[.*\]/i)
    expect(spanElement).not.toBeNull()
  })

  test(`bracketed span passes accessibility check`, async () => {
    document.body.innerHTML = markdownItLib.render(`one [two *three*]{.test}`)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
