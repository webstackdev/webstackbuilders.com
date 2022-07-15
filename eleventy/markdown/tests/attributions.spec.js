/**
 * Integration test for attributions markdown-it plugin
 */
const { queryByRole } = require(`@testing-library/dom`)

const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`converts double quotes to smart quotes`, () => {
  const blockquote = [
    "> That's one small step for [a] man, one giant leap for mankind.",
    '> -- Neil Armstrong (1969, July 21)',
  ].join('\n')

  test(`attribution generates <figure>, <blockquote>, and <figcaption> HTML elements`, () => {
    document.body.innerHTML = markdownItLib.render(blockquote)
    const figureElement = queryByRole(document.body, `figure`)
    expect(figureElement).not.toBeNull()
    const blockquoteElement = figureElement.querySelector(`blockquote`)
    expect(blockquoteElement).not.toBeNull()
    const figcaptionElement = figureElement.querySelector(`figcaption`)
    expect(figcaptionElement).not.toBeNull()
  })

  test(`blockquote HTML element has correct text`, () => {
    document.body.innerHTML = markdownItLib.render(blockquote)
    const figureElement = queryByRole(document.body, `figure`)
    expect(figureElement).not.toBeNull()
    expect(figureElement.querySelector(`p`).textContent).toMatch(/one small step/)
  })

  test(`figcaption HTML element has correct text`, () => {
    document.body.innerHTML = markdownItLib.render(blockquote)
    const figcaptionElement = document.body.querySelector(`figcaption`)
    expect(figcaptionElement).not.toBeNull()
    expect(figcaptionElement.textContent).toMatch(/Neil Armstrong/)
  })

  test(`attributions passes accessibility check`, async () => {
    document.body.innerHTML = markdownItLib.render(blockquote)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
