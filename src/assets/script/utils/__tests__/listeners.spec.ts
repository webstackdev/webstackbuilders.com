/**
 * Tests for event listener methods
 *
 * NOTE: exception handlers need tested in e2e, Jest has complex behavior
 * involving JSDOM's error handling that limits unit testing for the handlers.
 * https://github.com/facebook/jest/issues/5400
 */
import { resolve } from 'path'
import { JSDOM } from 'jsdom'
import { afterEach, describe, expect, jest, test } from '@jest/globals'
import { tsCompile } from '../../../../../test/jest/compileTs'

const getFixturePath = (fileName: string) => {
  return resolve(__dirname, '../__fixtures__', fileName)
}

const getDom = () => {
  const html = `<!DOCTYPE html><html><head></head><body></body></html>`
  return new JSDOM(html, { runScripts: 'dangerously' })
}

const addScript = async (fixtureFilename: string, document: Document) => {
  const fixturePath = getFixturePath(fixtureFilename)
  const script = await tsCompile(fixturePath)
  const scriptTag = document.createElement('script')
  scriptTag.innerHTML = script
  document.head.appendChild(scriptTag)
}

describe('addLoadedEventListeners event handlers added', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('addLoadedEventListeners works with void function', async () => {
    const {
      window: { document },
    } = getDom()
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    await addScript(`listeners_1.ts`, document)
    expect(addEventListenerSpy).toBeCalledWith('load', expect.any(Function))
  })
})

describe('addDomLoadedEventListeners event handlers added', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('addDomLoadedEventListeners works with void function', async () => {
    const {
      window: { document },
    } = getDom()
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    await addScript(`listeners_2.ts`, document)
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(1, 'DOMContentLoaded', expect.any(Function))
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(2, 'DOMContentLoaded', expect.any(Function))
  })
})

describe('addAllLoaderEventListeners load-all event handlers added', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('addAllLoaderEventListeners works with void function', async () => {
    const {
      window: { document },
    } = getDom()
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    await addScript(`listeners_3.ts`, document)
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(1, 'load', expect.any(Function))
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(2, 'DOMContentLoaded', expect.any(Function))
  })
})
