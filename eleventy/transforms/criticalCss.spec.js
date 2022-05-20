const { readFileSync } = require('fs')
const { JSDOM } = require('jsdom')

// Load document from Eleventy output directory
const { document } = new JSDOM(readFileSync('./public/index.html')).window

describe('eleventy-critical-css', () => {
  test.skip('should inline critical CSS to the head of the document', () => {
    const inlineStyles = document.head.querySelectorAll('style')
    expect(inlineStyles).toHaveLength(1)

    const extractedStyles = inlineStyles.item(0).innerHTML
    expect(extractedStyles).toBe('main{height:150vh}h1{color:red}')
  })

  test.skip('should load non-critical CSS asynchronously', () => {
    // TODO: Enable JavaScript and test that the styles are applied
    const linkedStyles = document.head.querySelectorAll(
      'link[rel="stylesheet"][href][media="print"][onload="this.media=\'all\'"]'
    )
    expect(linkedStyles).toHaveLength(1)
  })

  test.skip('should provide a fallback for users with JavaScript disabled', () => {
    // TODO: Check that the styles are applied with JavaScript disabled
    const fallbackStyles = document.querySelectorAll(
      'noscript > link[rel="stylesheet"][href]'
    )
    expect(fallbackStyles).toHaveLength(1)
  })
})
