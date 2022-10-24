/**
 * Tests for inline Typescript compiler used to pass script to JSDOM
 */
import { resolve } from 'path'
import { describe, expect, test } from '@jest/globals'
import { tsCompile } from '../../helpers'
import { isString } from '../../../../src/assets/script/utils/assertions/primitives'

const getFixturePath = (fileName: string) => {
  return resolve(__dirname, '../../__fixtures__/compileTs', fileName)
}

describe(`tsCompile compiles inline Typescript script`, () => {
  test(`compiles valid Typescript`, async () => {
    const fixturePath = getFixturePath(`compileTs_1.ts`)
    const sut = await tsCompile(fixturePath)
    expect(sut).toEqual(expect.stringContaining(`const foo = (input) => { return input; };`))
  })

  test(`strips typings`, async () => {
    const fixturePath = getFixturePath(`compileTs_2.ts`)
    const sut = await tsCompile(fixturePath)
    expect(sut).toEqual(expect.stringContaining(`const bar = 7;`))
  })

  test(`bundles external dependencies`, async () => {
    const fixturePath = getFixturePath(`compileTs_3.ts`)
    const sut = await tsCompile(fixturePath)
    expect(sut).toEqual(expect.stringContaining(`node_modules/lodash/lodash.js`))
    expect(isString(sut)).toBeTruthy()
    // bundling lodash dep should bloat file size, without dep should be ~300 chars
    expect(sut.length).toBeGreaterThanOrEqual(1000)
  })

  test(`imports local dependencies`, async () => {
    const fixturePath = getFixturePath(`compileTs_4.ts`)
    const sut = await tsCompile(fixturePath)
    expect(sut).toEqual(expect.stringContaining(`const myFunc = (input) => {`))
  })

  test(`throws if script file does not exist`, async () => {
    const fixturePath = getFixturePath(`nonexistent.ts`)
    await expect(tsCompile(fixturePath)).rejects.toThrow()
  })

  test(`throws if script path is a directory`, async () => {
    const fixturePath = getFixturePath(`compileTs`)
    await expect(tsCompile(fixturePath)).rejects.toThrow()
  })
})

describe(`tsCompile handles fake timers`, () => {
  test(`compiles when fake timers in use`, async () => {
    jest.useFakeTimers()
    const fixturePath = getFixturePath(`compileTs_1.ts`)
    const sut = await tsCompile(fixturePath)
    expect(sut).toEqual(expect.stringContaining(`const foo = (input) => { return input; };`))
    jest.useRealTimers()
  })
})

describe(`tsCompile handles outstanding timers`, () => {
  test(`ensureRealTimers throws if fake timers in use and timers are outstanding`, async () => {
    jest.useFakeTimers()
    setImmediate(() => {})
    const fixturePath = getFixturePath(`compileTs_1.ts`)
    await expect(tsCompile(fixturePath)).rejects.toThrow(Error)
    jest.useRealTimers()
  })

  test(`ensureRealTimers does nothing if real timers in use and timers are outstanding`, async () => {
    jest.useRealTimers()
    setImmediate(() => {})
    const fixturePath = getFixturePath(`compileTs_1.ts`)
    await expect(tsCompile(fixturePath)).resolves.toEqual(
      expect.stringContaining(`const foo = (input) => { return input; };`)
    )
  })
})
