import { describe, expect, test } from '@jest/globals'
import { JSDOM } from 'jsdom'
import { readFileSync } from 'fs'

// eslint-disable-next-line import/no-named-as-default
import buildCssCriticalTask from '../tasks/build:css:critical'
import { pipeFile } from '../pipe'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// Load document from Eleventy output directory
const sut = await pipeFile(
  readFileSync('../__fixtures__/index.html').toString(),
  'public/js/test.js',
  buildCssCriticalTask
)
const { document } = new JSDOM(sut[0]).window

// @TODO: problem for test is that sut hard-codes the CSS string? not sure how it would dynamically load a CSS file from parsing the HTML file, or if `css: []` option param in call to critical.stream is necessary
describe('eleventy-critical-css', () => {
  test.skip('should inline critical CSS to the head of the document', () => {
    const inlineStyles = document.head.querySelectorAll('style')
    expect(inlineStyles).toHaveLength(1)

    const extractedStyles = inlineStyles.item(0).innerHTML
    expect(extractedStyles).toBe('main{height:150vh}h1{color:red}')
  })
})

/* eslint-enable @typescript-eslint/no-unsafe-assignment */
