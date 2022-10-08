/**
 * Tests for loading JSDOM with script
 */
import { describe, expect, test } from '@jest/globals'
import { JSDOM } from 'jsdom'
import { mockCwd } from 'mock-cwd'
import { addScript, getFixturePath, loadDomWithScript } from '../loadJsdom'

describe(`Normalizes path`, () => {
  test(`Returns absolute path with filename and __dirname`, () => {
    mockCwd('/path/__tests__', () => {
      const templatePath = getFixturePath(`loadJsdom.njk`, process.cwd())
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
    const scriptPath = getFixturePath(`loadJsdom.ts`, __dirname)
    await addScript(scriptPath, document)
    expect(document.querySelectorAll(`script`)).toHaveLength(1)
    expect(document.querySelectorAll(`hr`)).toHaveLength(1)
  })
})

describe(`Loads JSDOM with script`, () => {
  test(`Loads JSDOM with script`, async () => {
    const templatePath = getFixturePath(`loadJsdom.njk`, __dirname)
    const scriptPath = getFixturePath(`loadJsdom.ts`, __dirname)
    const { window: { document } } = await loadDomWithScript(templatePath, scriptPath)
    expect(document.querySelectorAll(`hr`)).toHaveLength(1)
  })
})
