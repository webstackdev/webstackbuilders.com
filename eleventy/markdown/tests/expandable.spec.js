/**
 * Integration test for markdown-it CommonMark rules, GFM tables, and GFM strikethrough
 */
const { queryByRole, queryByText, within } = require(`@testing-library/dom`)

const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`adds open state collapsables to markdown with +++ content +++ syntax`, () => {
  const openStateMarkdown = `+++ Click me!\nHidden text\n+++`
  test(`open state collapsable has 'open' attribute on <details> HTML tag`, () => {
    document.body.innerHTML = markdownItLib.render(openStateMarkdown)
    const detailsElement = queryByRole(document.body, `group`)
    expect(detailsElement).not.toBeNull()
    expect(detailsElement).toHaveAttribute(`open`)
  })

  test(`open state collapsable has <summary> HTML tag nexted in <details> tag`, () => {
    document.body.innerHTML = markdownItLib.render(openStateMarkdown)
    const detailsElement = queryByRole(document.body, `group`)
    expect(detailsElement).not.toBeNull()
    expect(within(detailsElement).queryByText(/Click me!/)).not.toBeNull()
    expect(queryByText(document.body, /Click me!/).nodeName === `SUMMARY`).toBeTruthy()
  })

  test(`open state collapsable has nested <span> tag with non-breaking space as content`, () => {
    document.body.innerHTML = markdownItLib.render(openStateMarkdown)
    const summaryElement = queryByText(document.body, /Click me!/)
    expect(summaryElement).not.toBeNull()
    const spanElement = summaryElement.querySelector(`span`)
    expect(spanElement).not.toBeNull()
    expect(spanElement.textContent).toMatchInlineSnapshot(`" "`)
  })

  test(`open state collapsable has nested <p> tag with content set`, () => {
    document.body.innerHTML = markdownItLib.render(openStateMarkdown)
    const detailsElement = queryByRole(document.body, `group`)
    expect(detailsElement).not.toBeNull()
    const spanElement = detailsElement.querySelector(`p`)
    expect(spanElement).not.toBeNull()
    expect(spanElement).toHaveTextContent(`Hidden text`)
  })

  test(`open state collapsable passes accessibility check`, async () => {
    document.body.innerHTML = markdownItLib.render(openStateMarkdown)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})

describe(`adds closed state collapsables to markdown with >>> content >>> syntax`, () => {
  const closedStateMarkdown = `>>> Click me!\nHidden text\n>>>`
  test(`closed state collapsable does not have 'open' attribute on <details> HTML tag`, () => {
    document.body.innerHTML = markdownItLib.render(closedStateMarkdown)
    const detailsElement = queryByRole(document.body, `group`)
    expect(detailsElement).not.toBeNull()
    expect(detailsElement).not.toHaveAttribute(`open`)
  })

  test(`closed state collapsable has <summary> HTML tag nexted in <details> tag`, () => {
    document.body.innerHTML = markdownItLib.render(closedStateMarkdown)
    const detailsElement = queryByRole(document.body, `group`)
    expect(detailsElement).not.toBeNull()
    expect(within(detailsElement).queryByText(/Click me!/)).not.toBeNull()
    expect(queryByText(document.body, /Click me!/).nodeName === `SUMMARY`).toBeTruthy()
  })

  test(`closed state collapsable has nested <span> tag with non-breaking space as content`, () => {
    document.body.innerHTML = markdownItLib.render(closedStateMarkdown)
    const summaryElement = queryByText(document.body, /Click me!/)
    expect(summaryElement).not.toBeNull()
    const spanElement = summaryElement.querySelector(`span`)
    expect(spanElement).not.toBeNull()
    expect(spanElement.textContent).toMatchInlineSnapshot(`" "`)
  })

  test(`closed state collapsable has nested <p> tag with content set`, () => {
    document.body.innerHTML = markdownItLib.render(closedStateMarkdown)
    const detailsElement = queryByRole(document.body, `group`)
    expect(detailsElement).not.toBeNull()
    const spanElement = detailsElement.querySelector(`p`)
    expect(spanElement).not.toBeNull()
    expect(spanElement).toHaveTextContent(`Hidden text`)
  })

  test(`closed state collapsable passes accessibility check`, async () => {
    document.body.innerHTML = markdownItLib.render(closedStateMarkdown)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
