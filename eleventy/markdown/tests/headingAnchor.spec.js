/**
 * Integration test for heading anchor markdown plugin
 */
const { queryByRole } = require(`@testing-library/dom`)
const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`markdown heading anchor`, () => {
  test(`pound sign returns anchored HTML`, () => {
    document.body.innerHTML = markdownItLib.render(`# Title`)
    const headingElement = queryByRole(document, 'heading', { level: 1, name: 'Title' })
    expect(headingElement).not.toBeNull()
    /** Anchor element is nested in heading element */
    const anchorElement = queryByRole(headingElement, 'link', { hidden: true })
    expect(anchorElement).not.toBeNull()
  })

  test(`underlining with equals generates anchored HTML <h1> tags`, () => {
    document.body.innerHTML = markdownItLib.render(`Heading 1\n=========`)
    const headingElement = queryByRole(document, 'heading', { level: 1, name: 'Heading 1' })
    expect(headingElement).not.toBeNull()
    /** Anchor element is nested in heading element */
    const anchorElement = queryByRole(headingElement, 'link', { hidden: true })
    expect(anchorElement).not.toBeNull()
  })

  test(`underlining with dashes generates anchored HTML <h2> tags`, () => {
    document.body.innerHTML = markdownItLib.render(`Heading 2\n---------`)
    const headingElement = queryByRole(document, 'heading', { level: 2, name: 'Heading 2' })
    expect(headingElement).not.toBeNull()
    /** Anchor element is nested in heading element */
    const anchorElement = queryByRole(headingElement, 'link', { hidden: true })
    expect(anchorElement).not.toBeNull()
  })

  test(`anchor text is sluggified`, () => {
    document.body.innerHTML = markdownItLib.render(`# My Title`)
    const anchorElement = queryByRole(document, 'link', { hidden: true })
    expect(anchorElement).not.toBeNull()
    expect(anchorElement).toHaveAttribute('href', '#h-my-title')
  })

  test(`anchor symbol is hidden in accessibility tree`, () => {
    document.body.innerHTML = markdownItLib.render(`# Title`)
    const anchorElement = queryByRole(document, 'link', { hidden: true })
    expect(anchorElement).not.toBeNull()
    expect(anchorElement).toHaveAttribute(`aria-hidden`, `true`)
  })

  test(`h4 anchors returns non-anchored HTML`, () => {
    document.body.innerHTML = markdownItLib.render(`#### Title`)
    const headingElement = queryByRole(document, 'heading', { level: 4, name: 'Title' })
    expect(headingElement).not.toBeNull()
  })

  test(`anchor passes accessibility check`, async () => {
    document.body.innerHTML = markdownItLib.render(`# Title`)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
