/**
 * Tests for event listener methods
 *
 * NOTE: exception handlers need tested in e2e, Jest has complex behavior
 * involving JSDOM's error handling that limits unit testing for the handlers.
 * https://github.com/facebook/jest/issues/5400
 */
import { afterEach, describe, expect, jest, test } from '@jest/globals'
import {
  addScript,
  getCurriedFixturePath,
  getDocumentFromDom,
  loadDom,
} from '../../../../../test/jest/loadJsdom'

const getRelFixturePath = (filename: string) => `src/assets/script/utils/__fixtures__/${filename}`
const getFixturePath = getCurriedFixturePath(__dirname)
const templatePath = getFixturePath(`listeners.njk`)

describe('addLoadedEventListeners event handlers added', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('addLoadedEventListeners works with void function', async () => {
    const dom = await loadDom(templatePath)
    const document = getDocumentFromDom(dom)
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    await addScript(getRelFixturePath(`listeners_1.ts`), document)
    expect(addEventListenerSpy).toBeCalledWith('load', expect.any(Function))
  })
})

describe('addDomLoadedEventListeners event handlers added', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('addDomLoadedEventListeners works with void function', async () => {
    const dom = await loadDom(templatePath)
    const document = getDocumentFromDom(dom)
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    await addScript(getRelFixturePath(`listeners_2.ts`), document)
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
    const dom = await loadDom(templatePath)
    const document = getDocumentFromDom(dom)
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    await addScript(getRelFixturePath(`listeners_3.ts`), document)
    /**
     * 1 each for 'load' and 'DOMContentLoaded', and 6 for delayedLoader() for each user
     * interaction event
     */
    expect(addEventListenerSpy).toHaveBeenCalledTimes(8)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(1, 'load', expect.any(Function))
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(2, 'DOMContentLoaded', expect.any(Function))
  })
})
