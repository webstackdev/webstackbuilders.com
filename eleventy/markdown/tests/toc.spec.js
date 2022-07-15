/**
 * Integration test for table of contents markdown-it plugin
 */
const { queryAllByRole, within } = require(`@testing-library/dom`)

const { axe } = require(`./config`)
const { markdownItLib } = require(`../setup`)

describe(`Table of contents generates valid HTML unordered list markup`, () => {
  const markupWithHeadings = [
    '# Heading',
    '',
    '[[toc]]',
    '',
    '## Sub heading 1',
    'Some nice text',
    '',
    '## Sub heading 2',
    'Some even nicer text',
  ].join('\n')

  test(`markdown with headings generates table of contents <ul>`, () => {
    document.body.innerHTML = markdownItLib.render(markupWithHeadings)
    const tocList = queryAllByRole(document.body, `list`)[0]
    expect(within(tocList).getByText('Heading')).toBeTruthy()
    expect(within(tocList).getByText('Sub heading 1')).toBeTruthy()
    expect(within(tocList).getByText('Sub heading 2')).toBeTruthy()
  })

  test(`Table of contents passes accessibility check`, async () => {
    document.body.innerHTML = markdownItLib.render(markupWithHeadings)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
