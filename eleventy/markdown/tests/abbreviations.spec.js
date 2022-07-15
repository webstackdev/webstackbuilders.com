/**
 * Integration test for abbreviation markdown plugin
 */
const { queryByText } = require(`@testing-library/dom`)
const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`add abbreviations to markdown`, () => {
  const htmlString = markdownItLib.render(
    `*[HTML]: Hyper Text Markup Language\nThe HTML specification`
  )

  test(`adds <abbr> tag to markdown for abbreviation`, () => {
    document.body.innerHTML = htmlString
    const element = queryByText(document, /html/i)
    expect(element).not.toBeNull()
    expect(element.nodeName == 'ABBR').toBeTruthy()
  })

  test(`adds title attribute to <abbr> tag`, () => {
    document.body.innerHTML = htmlString
    const element = queryByText(document, /html/i)
    expect(element).not.toBeNull()
    expect(element).toHaveAttribute(`title`, `Hyper Text Markup Language`)
  })

  test(`container block passes accessibility check`, async () => {
    document.body.innerHTML = htmlString
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
