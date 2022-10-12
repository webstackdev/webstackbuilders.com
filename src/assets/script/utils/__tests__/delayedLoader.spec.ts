/**
 * Tests for event listener methods
 */
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals'
import {
  addScript,
  getCurriedFixturePath,
  getDocumentFromDom,
  loadDom,
} from '../../../../../test/jest/loadJsdom'
import { autoLoadDuration, eventList } from '../delayedLoader'

const getRelFixturePath = (filename: string) => `src/assets/script/utils/__fixtures__/${filename}`
const getFixturePath = getCurriedFixturePath(__dirname)
const templatePath = getFixturePath(`delayedLoader.njk`)

//jest.useFakeTimers()

describe.skip(`delayedLoader event handlers added`, () => {
  const opts = {
    passive: true,
  }
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  test(`delayedLoader adds event listeners for all user interaction events`, async () => {
    const dom = await loadDom(templatePath)
    const document = getDocumentFromDom(dom)
    const addEventListenerSpy = jest.spyOn(document, `addEventListener`)
    await addScript(getRelFixturePath(`delayedLoader_1.ts`), document)
    expect(addEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(1, `keydown`, expect.any(Function), opts)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(2, `mousemove`, expect.any(Function), opts)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(3, `wheel`, expect.any(Function), opts)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(4, `touchmove`, expect.any(Function), opts)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(5, `touchstart`, expect.any(Function), opts)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(6, `touchend`, expect.any(Function), opts)
  })
})

describe.skip(`delayedLoader fires scripts after timeout`, () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test(`delayedLoader runs script after timeout if no user interaction`, async () => {
    const dom = await loadDom(templatePath)
    const document = getDocumentFromDom(dom)
    await addScript(getRelFixturePath(`delayedLoader_1.ts`), document)
    jest.runAllTimers()
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), autoLoadDuration)
  })
})

// @TODO: getting timeouts when adding these tests, even setting timeout to 50000. Memory leak? They pass individually.
describe.skip(`delayedLoader fires scripts and removes event listeners after user interaction`, () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test(`delayedLoader runs on user key press`, async () => {
    const dom = await loadDom(templatePath)
    const document = getDocumentFromDom(dom)
    const removeEventListenerSpy = jest.spyOn(document, `removeEventListener`)
    await addScript(getRelFixturePath(`delayedLoader_2_1.ts`), document)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(clearTimeout).toHaveBeenCalled()
  })

  test(`delayedLoader runs on user mouse movement`, async () => {
    const dom = await loadDom(templatePath)
    const document = getDocumentFromDom(dom)
    const removeEventListenerSpy = jest.spyOn(document, `removeEventListener`)
    await addScript(getRelFixturePath(`delayedLoader_2_2.ts`), document)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(clearTimeout).toHaveBeenCalled()
  })

  test(`delayedLoader runs on user wheel movement`, async () => {
    const dom = await loadDom(templatePath)
    const document = getDocumentFromDom(dom)
    const removeEventListenerSpy = jest.spyOn(document, `removeEventListener`)
    await addScript(getRelFixturePath(`delayedLoader_2_3.ts`), document)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(clearTimeout).toHaveBeenCalled()
  })

  test(`delayedLoader runs on user touch move`, async () => {
    const dom = await loadDom(templatePath)
    const document = getDocumentFromDom(dom)
    const removeEventListenerSpy = jest.spyOn(document, `removeEventListener`)
    await addScript(getRelFixturePath(`delayedLoader_2_4.ts`), document)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(clearTimeout).toHaveBeenCalled()
  })

  test(`delayedLoader runs on user touch start`, async () => {
    const dom = await loadDom(templatePath)
    const document = getDocumentFromDom(dom)
    const removeEventListenerSpy = jest.spyOn(document, `removeEventListener`)
    await addScript(getRelFixturePath(`delayedLoader_2_5.ts`), document)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(clearTimeout).toHaveBeenCalled()
  })

  test(`delayedLoader runs on user touch end`, async () => {
    const dom = await loadDom(templatePath)
    const document = getDocumentFromDom(dom)
    const removeEventListenerSpy = jest.spyOn(document, `removeEventListener`)
    await addScript(getRelFixturePath(`delayedLoader_2_6.ts`), document)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(clearTimeout).toHaveBeenCalled()
  })
})
