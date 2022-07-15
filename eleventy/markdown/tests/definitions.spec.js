/**
 * Integration test for definition lists markdown plugin
 */

const { queryAllByRole, getByText } = require(`@testing-library/dom`)
const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`adds definition lists to markdown`, () => {
  const definitionListHtmlString = markdownItLib.render(`
Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b
`)
  test(`output is wrapped in a definition list`, () => {
    document.body.innerHTML = definitionListHtmlString
    expect(document.body.firstChild.nodeName === `DL`).toBeTruthy()
  })

  test(`contains two term descriptions in the definition list`, () => {
    document.body.innerHTML = definitionListHtmlString
    expect(queryAllByRole(document.body, 'term')).toHaveLength(2)
  })

  test(`has three definition descriptions`, () => {
    document.body.innerHTML = definitionListHtmlString
    expect(getByText(document.body, 'Definition 1')).toBeTruthy()
    expect(getByText(document.body, 'Definition 2a')).toBeTruthy()
    expect(getByText(document.body, 'Definition 2b')).toBeTruthy()
  })

  test(`definition list passes accessibility check`, async () => {
    document.body.innerHTML = definitionListHtmlString
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
