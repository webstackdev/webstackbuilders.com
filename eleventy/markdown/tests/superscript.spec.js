/**
 * Integration test for superscript markdown plugin
 */
const { queryByText } = require(`@testing-library/dom`)
const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`carats before alphanumeric characters generates HTML <sup> tags`, () => {
  test(`h4 anchors returns non-anchored HTML`, () => {
    document.body.innerHTML = markdownItLib.render(`29^th^`)
    expect(queryByText(document, /th/i).nodeName === `SUP`).toBeTruthy()
  })

  test(`footnotes block passes accessibility check`, async () => {
    document.body.innerHTML = markdownItLib.render(`29^th^`)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
