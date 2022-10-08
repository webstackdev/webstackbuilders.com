/**
 * Tests for event listener methods
 */
import { resolve } from 'path'
import { JSDOM } from 'jsdom'
import { afterEach, describe, expect, jest, test } from '@jest/globals'
import { tsCompile } from '../../../../../test/jest/compileTs'
import { autoLoadDuration, eventList } from '../delayedLoader'

const getFixturePath = (fileName: string) => {
  return resolve(__dirname, `../__fixtures__`, fileName)
}

const getDom = () => {
  const html = `<!DOCTYPE html><html><head></head><body></body></html>`
  return new JSDOM(html, { runScripts: `dangerously` })
}

const addScript = async (fixtureFilename: string, document: Document, useFakeTimers = false) => {
  const fixturePath = getFixturePath(fixtureFilename)
  const script = await tsCompile(fixturePath)
  const scriptTag = document.createElement(`script`)
  scriptTag.innerHTML = script
  useFakeTimers && jest.useFakeTimers()
  useFakeTimers && jest.spyOn(global, `setTimeout`)
  useFakeTimers && jest.spyOn(global, `clearTimeout`)
  document.head.appendChild(scriptTag)
}

describe(`delayedLoader event handlers added`, () => {
  const opts = {
    passive: true,
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  test(`delayedLoader adds event listeners for all user interaction events`, async () => {
    const {
      window: { document },
    } = getDom()
    const addEventListenerSpy = jest.spyOn(document, `addEventListener`)
    await addScript(`delayedLoader_1.ts`, document)
    expect(addEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(1, `keydown`, expect.any(Function), opts)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(2, `mousemove`, expect.any(Function), opts)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(3, `wheel`, expect.any(Function), opts)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(4, `touchmove`, expect.any(Function), opts)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(5, `touchstart`, expect.any(Function), opts)
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(6, `touchend`, expect.any(Function), opts)
  })
})

describe(`delayedLoader fires scripts after timeout`, () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test(`delayedLoader runs script after timeout if no user interaction`, async () => {
    const {
      window: { document },
    } = getDom()
    await addScript(`delayedLoader_1.ts`, document, true)
    jest.runAllTimers()
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), autoLoadDuration)
  })
})

// @TODO: getting timeouts when adding these tests, even setting timeout to 50000. Memory leak? They pass individually.
describe(`delayedLoader fires scripts and removes event listeners after user interaction`, () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test.skip(`delayedLoader runs on user key press`, async () => {
    const {
      window: { document },
    } = getDom()
    const removeEventListenerSpy = jest.spyOn(document, `removeEventListener`)
    await addScript(`delayedLoader_2_1.ts`, document, true)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(clearTimeout).toHaveBeenCalled()
  })

  test.skip(`delayedLoader runs on user mouse movement`, async () => {
    const {
      window: { document },
    } = getDom()
    const removeEventListenerSpy = jest.spyOn(document, `removeEventListener`)
    await addScript(`delayedLoader_2_2.ts`, document, true)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(clearTimeout).toHaveBeenCalled()
  })

  test.skip(`delayedLoader runs on user wheel movement`, async () => {
    const {
      window: { document },
    } = getDom()
    const removeEventListenerSpy = jest.spyOn(document, `removeEventListener`)
    await addScript(`delayedLoader_2_3.ts`, document, true)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(clearTimeout).toHaveBeenCalled()
  })

  test.skip(`delayedLoader runs on user touch move`, async () => {
    const {
      window: { document },
    } = getDom()
    const removeEventListenerSpy = jest.spyOn(document, `removeEventListener`)
    await addScript(`delayedLoader_2_4.ts`, document, true)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(clearTimeout).toHaveBeenCalled()
  })

  test.skip(`delayedLoader runs on user touch start`, async () => {
    const {
      window: { document },
    } = getDom()
    const removeEventListenerSpy = jest.spyOn(document, `removeEventListener`)
    await addScript(`delayedLoader_2_5.ts`, document, true)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(clearTimeout).toHaveBeenCalled()
  })

  test.skip(`delayedLoader runs on user touch end`, async () => {
    const {
      window: { document },
    } = getDom()
    const removeEventListenerSpy = jest.spyOn(document, `removeEventListener`)
    await addScript(`delayedLoader_2_6.ts`, document, true)
    expect(document.querySelectorAll(`hr`)).toHaveLength(2)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(eventList.length)
    expect(clearTimeout).toHaveBeenCalled()
  })
})
