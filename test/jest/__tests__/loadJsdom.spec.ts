/**
 * Tests for loading JSDOM with script
 */
import { describe, expect, test } from '@jest/globals'
import { JSDOM } from 'jsdom'
import { mockCwd } from 'mock-cwd'
import {
  addScript,
  getDocumentFromDom,
  getFixturePath as originalGetFixturePath,
  getCurriedFixturePath,
  loadDom,
  loadDomWithScript,
} from '../loadJsdom'

const getFixturePath = getCurriedFixturePath(__dirname)

describe(`Normalizes path`, () => {
  test(`Returns absolute path with filename and __dirname`, () => {
    mockCwd('/path/__tests__', () => {
      const templatePath = originalGetFixturePath(process.cwd(), `loadJsdom.njk`)
      expect(templatePath).toMatch(`/path/__fixtures__/loadJsdom.njk`)
    })
  })
})

describe(`Adds script to JSDOM object and runs it`, () => {
  test(`Adds script`, async () => {
    const html = `<!DOCTYPE html><html><head></head><body></body></html>`
    const {
      window: { document },
    } = new JSDOM(html, { runScripts: `dangerously` })
    const scriptPath = getFixturePath(`loadJsdom.ts`)
    await addScript(scriptPath, document)
    expect(document.querySelectorAll(`script`)).toHaveLength(1)
    expect(document.querySelectorAll(`hr`)).toHaveLength(1)
  })
})

describe(`Destructs JSDOM object to the Document object`, () => {
  test(`Document object is valid`, async () => {
    const templatePath = getFixturePath(`loadJsdom.njk`)
    const dom = await loadDom(templatePath)
    const document = getDocumentFromDom(dom)
    expect(document.querySelectorAll(`p`)).toHaveLength(1)
  })
})

describe(`Loads JSDOM with template only`, () => {
  test(`Loads JSDOM with template only`, async () => {
    const templatePath = getFixturePath(`loadJsdom.njk`)
    const {
      window: { document },
    } = await loadDom(templatePath)
    expect(document.querySelectorAll(`p`)).toHaveLength(1)
  })
})

describe(`Loads JSDOM with script`, () => {
  test(`Loads JSDOM with script`, async () => {
    const templatePath = getFixturePath(`loadJsdom.njk`)
    const scriptPath = getFixturePath(`loadJsdom.ts`)
    const {
      window: { document },
    } = await loadDomWithScript(templatePath, scriptPath)
    expect(document.querySelectorAll(`hr`)).toHaveLength(1)
  })
})
