import { describe, expect, test } from '@jest/globals'
import { resolve } from 'path'
import { loadHtmlTemplate, type EleventyJson } from '../../helpers'

const templatePath = resolve(`test/jest/__fixtures__/loadHtmlTemplate.njk`)

describe('Loads a template file', () => {
  test('loadHtmlTemplate should return an HTML string', async () => {
    const json: EleventyJson = await loadHtmlTemplate(templatePath)
    expect(json.content).toContain(
      `<p id="test__paragraph">This is a <a id="test__anchor" href="/test">test template</a>.</p>`
    )
  })
})

describe('loadHtmlTemplate handles fake timers', () => {
  test('loadHtmlTemplate should work with fake timers', async () => {
    jest.useFakeTimers()
    const json: EleventyJson = await loadHtmlTemplate(templatePath)
    expect(json.content).toContain(
      `<p id="test__paragraph">This is a <a id="test__anchor" href="/test">test template</a>.</p>`
    )
    jest.useRealTimers()
  })
})

describe('loadHtmlTemplate handles pending timers', () => {
  test(`loadHtmlTemplate throws if fake timers in use and timers are outstanding`, async () => {
    jest.useFakeTimers()
    setImmediate(() => {})
    await expect(loadHtmlTemplate(templatePath)).rejects.toThrow(Error)
    jest.useRealTimers()
  })

  test(`loadHtmlTemplate works if real timers in use and timers are outstanding`, async () => {
    jest.useRealTimers()
    setImmediate(() => {})
    const json: EleventyJson = await loadHtmlTemplate(templatePath)
    expect(json.content).toContain(
      `<p id="test__paragraph">This is a <a id="test__anchor" href="/test">test template</a>.</p>`
    )
  })
})
