/**
 * Integration test for superscript markdown plugin
 */
const { getBy } = require(`@testing-library/dom`)
const { axe } = require(`../../../test/jest/accessibility`)
const { markdownItLib } = require(`../setup`)

describe(`carats before alphanumeric characters generates HTML <sup> tags`, () => {
  test(`h4 anchors returns non-anchored HTML`, () => {
    document.body.innerHTML = markdownItLib.render(`29^th^`)
    expect(getBy(document, /th/i).nodeName === `SUP`).toBeTruthy() // TypeError: getBy is not a function
  })

  test(`footnotes block passes accessibility check`, async () => {
    document.body.innerHTML = markdownItLib.render(`29^th^`)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
