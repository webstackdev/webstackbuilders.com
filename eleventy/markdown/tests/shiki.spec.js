/**
 * Integration test for Apache Echarts ECharts interactive charting
 * and data visualization library for browser markdown-it plugin.
 */
const { queryAllByRole, queryByRole } = require(`@testing-library/dom`)

const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`Shiki code highlighting`, () => {
  const codeBlockMarkup = "```javascript\nconsole.log('hello')\n```"
  test.skip(`Shiki generates <code> output with highlighting`, () => {
    document.body.innerHTML = markdownItLib.render(codeBlockMarkup)
    expect(document.body).toMatchInlineSnapshot()
    //expect(document.body.querySelector(`math`)).toBeTruthy()
  })

  test.skip(`Shiki output passes accessibility check`, async () => {
    document.body.innerHTML = markdownItLib.render(codeBlockMarkup)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
