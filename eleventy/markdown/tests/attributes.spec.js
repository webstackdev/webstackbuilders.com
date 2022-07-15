/**
 * Integration test for attributes markdown plugin to add attributes to spans
 */
const { queryByRole, queryByText } = require(`@testing-library/dom`)
const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`adds properties to markdown elements`, () => {
  test(`id, class, and attribute added to inline element`, () => {
    document.body.innerHTML = markdownItLib.render(`*span*{#extra .custom data-toggle=modal}`)
    const spanElement = queryByText(document, /span/i)
    expect(spanElement).not.toBeNull()
    expect(document.getElementById(`extra`)).toBeTruthy()
    expect(spanElement).toHaveClass(`custom`)
    expect(spanElement).toHaveAttribute(`data-toggle`, `modal`)
  })

  test(`target added to markdown link`, () => {
    document.body.innerHTML = markdownItLib.render(`[link](/to/link){target="_blank"}`)
    const anchorElement = queryByRole(document, `link`)
    expect(anchorElement).not.toBeNull()
    expect(anchorElement).toHaveAttribute(`href`, `/to/link`)
    expect(anchorElement).toHaveAttribute(`target`, `_blank`)
  })

  test(`attributes span passes accessibility check`, async () => {
    document.body.innerHTML = markdownItLib.render(`one *two three*{#myId .test attr=value}`)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
