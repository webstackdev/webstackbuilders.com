/**
 * Integration test for emoji markdown plugin
 */
const { queryByText } = require(`@testing-library/dom`)
const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`emoji embeds in markdown`, () => {
  /** Markdown output runs through Nunjucks after compiling */
  test(`outputs emoji using shortcode`, () => {
    document.body.innerHTML = markdownItLib.render(`:100:`)
    expect(queryByText(document, /💯/i)).not.toBeNull()
  })

  test(`outputs emoji using shortcut`, () => {
    document.body.innerHTML = markdownItLib.render(`:)`)
    expect(queryByText(document, /😃/i)).not.toBeNull()
  })
})
