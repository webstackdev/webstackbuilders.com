/**
 * Integration test for code tabs markdown plugin
 */
const { queryByLabelText, queryByText, queryByRole } = require(`@testing-library/dom`)
const { axe } = require(`../../../test/jest/accessibility`)
const { markdownItLib } = require(`../setup`)

describe(`add abbreviations to markdown`, () => {
  const firstCodeTab = "```javascript [g1:js]\nconsole.log('hello');\n```"
  const secondCodeTab = "```typescript [g1:ts]\nprint('hello')\n```"
  const htmlString = markdownItLib.render(`${firstCodeTab}\n${secondCodeTab}`)

  test(`adds unordered list with elements for each language given`, () => {
    document.body.innerHTML = htmlString
    const listElement = queryByRole(document.body, 'list')
    expect(listElement).toBeInTheDocument()
    expect(queryByLabelText(document.body, `js`)).toBeInTheDocument()
    expect(queryByLabelText(document.body, `ts`)).toBeInTheDocument()
  })

  test(`adds code block for each language given`, () => {
    document.body.innerHTML = htmlString
    const listElement = queryByRole(document.body, 'list')
    expect(listElement).toBeInTheDocument()
    expect(queryByText(document.body, `console.log('hello');`)).toBeInTheDocument()
    expect(queryByText(document.body, `print('hello')`)).toBeInTheDocument()
  })

  test(`container block passes accessibility check`, async () => {
    document.body.innerHTML = htmlString
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
