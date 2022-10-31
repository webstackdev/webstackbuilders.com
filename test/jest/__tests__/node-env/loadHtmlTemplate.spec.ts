import { describe, expect, test, beforeEach, afterEach } from '@jest/globals'
import { resolve } from 'path'
import { loadHtmlTemplate } from '../../helpers'

const templatePath = resolve(`test/jest/__fixtures__/loadHtmlTemplate.njk`)

describe('Loads a template file', () => {
  test('loadHtmlTemplate should return an HTML string', async () => {
    const json = await loadHtmlTemplate(templatePath)
    expect(json).toContain(
      `<p id="test__paragraph">This is a <a id="test__anchor" href="/test">test template</a>.</p>`
    )
  })
})

describe('loadHtmlTemplate handles fake timers', () => {
  beforeEach(() => {
    //jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test.only('loadHtmlTemplate should work with fake timers', async () => {
    const json = await loadHtmlTemplate(templatePath)
    jest.useFakeTimers()
    //expect(json).toContain(
    //  `<p id="test__paragraph">This is a <a id="test__anchor" href="/test">test template</a>.</p>`
    //)
    expect(json).toMatchInlineSnapshot(
      `"<p id="test__paragraph">This is a <a id="test__anchor" href="/test">test template</a>.</p>"`
    )
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
    const json = await loadHtmlTemplate(templatePath)
    expect(json).toContain(
      `<p id="test__paragraph">This is a <a id="test__anchor" href="/test">test template</a>.</p>`
    )
  })
})
