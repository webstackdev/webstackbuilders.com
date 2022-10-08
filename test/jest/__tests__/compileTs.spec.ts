/**
 * Tests for inline Typescript compiler used to pass script to JSDOM
 */
import { resolve } from 'path'
import { describe, expect, test } from '@jest/globals'
import { tsCompile } from '../compileTs'

const getFixturePath = (fileName: string) => {
  return resolve(__dirname, '../__fixtures__', fileName)
}

describe(`tsCompile compiles inline Typescript script`, () => {
  test(`tsCompile compiles valid Typescript`, async () => {
    const fixturePath = getFixturePath(`compileTs_1.ts`)
    const sut = await tsCompile(fixturePath)
    expect(sut).toEqual(expect.stringContaining(`const foo = (input) => { return input; };`))
  })

  test(`tsCompile strips typings`, async () => {
    const fixturePath = getFixturePath(`compileTs_2.ts`)
    const sut = await tsCompile(fixturePath)
    expect(sut).toEqual(expect.stringContaining(`const bar = 7;`))
  })

  test(`tsCompile bundles external dependencies`, async () => {
    const fixturePath = getFixturePath(`compileTs_3.ts`)
    const sut = await tsCompile(fixturePath)
    expect(sut).toEqual(expect.stringContaining(`node_modules/lodash/lodash.js`))
    // bundling lodash dep should bloat file size, without dep should be ~300 chars
    expect((sut as string).length).toBeGreaterThanOrEqual(1000)
  })

  test(`tsCompile imports local dependencies`, async () => {
    const fixturePath = getFixturePath(`compileTs_4.ts`)
    const sut = await tsCompile(fixturePath)
    expect(sut).toEqual(expect.stringContaining(`const myFunc = (input) => {`))
  })
})
