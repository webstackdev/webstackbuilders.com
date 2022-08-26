/**
 * Integration test for built-in and extended typographer substitutions like smart quotes
 */
const { queryByText } = require(`@testing-library/dom`)
const decode = require(`html-entities-decoder`)

const { axe } = require(`../../../test/jest/accessibility`)
const { markdownItLib } = require(`../setup`)

describe(`markdown-it parser built-in typographer replacement rules work`, () => {
  test(`(c) in markdown is replaced with ©`, async () => {
    document.body.innerHTML = markdownItLib.render(`test(c)`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(decode(`&#xA9;`))
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`(tm) in markdown is replaced with ™`, async () => {
    document.body.innerHTML = markdownItLib.render(`test(tm)`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(decode(`&#x2122;`))
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`(TM) in markdown is replaced with ™`, async () => {
    document.body.innerHTML = markdownItLib.render(`test(tm)`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(decode(`&#x2122;`))
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`(r) in markdown is replaced with ®`, async () => {
    document.body.innerHTML = markdownItLib.render(`test(r)`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(decode(`&#xAE;`))
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`(R) in markdown is replaced with ®`, async () => {
    document.body.innerHTML = markdownItLib.render(`test(R)`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(decode(`&#xAE;`))
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`+- in markdown is replaced with ±`, async () => {
    document.body.innerHTML = markdownItLib.render(`5+-`)
    expect(queryByText(document.body, /5/)).toHaveTextContent(decode(`&#xB1;`))
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`... in markdown is replaced with …`, async () => {
    document.body.innerHTML = markdownItLib.render(`test...`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(decode(`&#x2026;`))
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`?.... in markdown is replaced with ?..`, async () => {
    document.body.innerHTML = markdownItLib.render(`test?....`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(`?..`)
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`!.... in markdown is replaced with !..`, async () => {
    document.body.innerHTML = markdownItLib.render(`test!....`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(`!..`)
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`?.... in markdown is replaced with ?..`, async () => {
    document.body.innerHTML = markdownItLib.render(`test?....`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(`?..`)
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`???????? in markdown is replaced with ???`, async () => {
    document.body.innerHTML = markdownItLib.render(`test????????`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(`???`)
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`!!!!! in markdown is replaced with !!!`, async () => {
    document.body.innerHTML = markdownItLib.render(`test!!!!!`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(`!!!`)
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`,, in markdown is replaced with ,`, async () => {
    document.body.innerHTML = markdownItLib.render(`test,,`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(`,`)
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`-- in markdown is replaced with –`, async () => {
    document.body.innerHTML = markdownItLib.render(`test--`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(decode(`&ndash;`))
    expect(await axe(document.body)).toHaveNoViolations()
  })

  test(`--- in markdown is replaced with —`, async () => {
    document.body.innerHTML = markdownItLib.render(`test---`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(decode(`&mdash;`))
    expect(await axe(document.body)).toHaveNoViolations()
  })
})

describe('markdown-it-smartarrows', function () {
  it.skip('should render smart arrows', function () {
    var s, target
    var markdownItLib = require('markdown-it')({ typographer: true }).use(require('../'))

    s = '--> <-- <--> ==> <== <==>'
    target = '<p>→ ← ↔ ⇒ ⇐ ⇔</p>\n'
    expect(markdownItLib.render(s)).to.equal(target)

    // And should not break headers or m-dashes
    s = 'Arrows\n==\nAnd friends\n--\n--> <-- <-->\n\n==> <== <==> --- m-dash -- n-dash'
    target = '<h1>Arrows</h1>\n<h2>And friends</h2>\n<p>→ ← ↔</p>\n<p>⇒ ⇐ ⇔ — m-dash – n-dash</p>\n'
    expect(markdownItLib.render(s)).to.equal(target)
  })

  it.skip('should properly cope with unicode spaces', function () {
    var s, target
    var md = require('markdown-it')().use(require('../'))

    // \u3000 is a unicode space character that doesn't match \s in older browsers.
    // http://www.fileformat.info/info/unicode/category/Zs/list.htm
    s = 'a ==>\u3000b'
    target = '<p>a ⇒\u3000b</p>\n'
    expect(markdownItLib.render(s)).to.equal(target)
  })
})
/**
 *
 */
function setupMarkdownIt() {
  var markdownItReplacements, test

  markdownItReplacements = require('.')

  test = function (text, options, typographer) {
    var md
    if (typographer == null) {
      typographer = true
    }
    md = markdownit
      .skip({
        typographer: typographer,
      })
      .use(markdownItReplacements, options)
    return markdownItLib.renderInline(text)
  }
}

describe('markdown-it-replacements', function () {
  test.skip(`(p) in markdown is replaced with §`, async () => {
    document.body.innerHTML = markdownItLib.render(`test(p)`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(decode(`&#xA7;`))
    expect(await axe(document.body)).toHaveNoViolations()
    expect(document.body).toMatchInlineSnapshot()
  })

  test.skip(`(P) in markdown is replaced with §`, async () => {
    document.body.innerHTML = markdownItLib.render(`test(P)`)
    expect(queryByText(document.body, /test/)).toHaveTextContent(decode(`&#xA7;`))
    expect(await axe(document.body)).toHaveNoViolations()
    expect(document.body).toMatchInlineSnapshot()
  })

  it.skip('blank values', function () {
    expect(true).equal('', test(''))
  })
  it.skip('override (c) replacement behavior', function () {
    expect(true).equal('(c)', test('(c)'))
  })
  it.skip('ndash', function () {
    expect(true).equal('1\u20139', test('1--9'))
  })
  it.skip('mdash', function () {
    expect(true).equal('yes\u2014or no', test('yes---or no'))
  })
  it.skip('ellipsis', function () {
    expect(true).equal('yes\u2026', test('yes...'))
  })
  it.skip('plus minus', function () {
    expect(true).equal('1 \u00b1 100', test('1 +- 100'))
  })
  it.skip('override ndash', function () {
    expect(true).equal(
      '1--9',
      test('1--9', {
        ndash: false,
      })
    )
  })
  it.skip('override mdash', function () {
    expect(true).equal(
      'yes---or no',
      test('yes---or no', {
        mdash: false,
      })
    )
  })
  it.skip('override ellipsis', function () {
    expect(true).equal(
      'yes...',
      test('yes...', {
        ellipsis: false,
      })
    )
  })
  it.skip('override plus minus', function () {
    expect(true).equal(
      '1 +- 100',
      test('1 +- 100', {
        plusminus: false,
      })
    )
  })
  it.skip('runs even with typographer set to false', function () {
    expect(true).equal('1\u20139', test('1--9', {}, false))
  })
  it.skip('custom replacement, no default', function () {
    markdownItReplacements.replacements.push({
      name: 'allcaps',
      re: /[a-z]/g,
      sub: function (s) {
        return s.toUpperCase()
      },
    })
    expect(true).equal('HELLO', test('hello'))
  })
  it.skip('custom replacement, default true', function () {
    markdownItReplacements.replacements[markdownItReplacements.replacements.length - 1][
      'default'
    ] = true
    expect(true).equal('HELLO', test('hello'))
  })
  return it.skip('custom replacement, default false', function () {
    markdownItReplacements.replacements[markdownItReplacements.replacements.length - 1][
      'default'
    ] = false
    expect(true).equal('hello', test('hello'))
  })
})
