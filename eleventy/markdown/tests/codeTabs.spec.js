/**
 * Integration test for code tabs markdown plugin
 */
const { queryByLabelText, queryByText, queryByRole } = require(`@testing-library/dom`)
const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`add abbreviations to markdown`, () => {
  const firstCodeTab = "```javascript [g1:js]\nconsole.log('hello');\n```"
  const secondCodeTab = "```typescript [g1:ts]\nprint('hello')\n```"
  const htmlString = markdownItLib.render(`${firstCodeTab}\n${secondCodeTab}`)

  test(`adds unordered list with elements for each language given`, () => {
    document.body.innerHTML = htmlString
    const listElement = queryByRole(document.body, 'list')
    expect(listElement).not.toBeNull()
    expect(queryByLabelText(document.body, `js`)).not.toBeNull()
    expect(queryByLabelText(document.body, `ts`)).not.toBeNull()
  })

  test(`adds code block for each language given`, () => {
    document.body.innerHTML = htmlString
    const listElement = queryByRole(document.body, 'list')
    expect(listElement).not.toBeNull()
    expect(queryByText(document.body, `console.log('hello');`)).not.toBeNull()
    expect(queryByText(document.body, `print('hello')`)).not.toBeNull()
  })

  test(`container block passes accessibility check`, async () => {
    document.body.innerHTML = htmlString
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
