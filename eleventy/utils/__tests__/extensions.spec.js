/**
 * Unit tests for extensions loader logic
 */
const _ = require('lodash')
const rewire = require('rewire')
const extensions = rewire('../extensions')
const eleventySetup = require('../../../eleventy')
const eleventyConfig = require('../../__fixtures__/eleventyConfig')

const {
  _isValidExtensionType,
  _getExtensionFnName,
  _curryExtension,
  _addExtensionsByType,
  _appendAddFnToEleventySetup,
} = extensions

describe(`Handles extension type validation`, () => {
  test(`Returns true if extension type is okay`, () => {
    expect(_isValidExtensionType(`filters`)).toBeTruthy()
  })

  test(`Returns false if extension type is invalid`, () => {
    expect(_isValidExtensionType(`notrealextension`)).toBeFalsy()
  })
})

describe(`Builds an extension function name from the extension type`, () => {
  test(`Happy path build function name`, () => {
    expect(_getExtensionFnName(`filters`)).toBe(`addFilter`)
  })

  test(`Throws if extension type is invalid`, () => {
    expect(() => _getExtensionFnName(`notrealextension`)).toThrow()
  })
})

describe(`Curries the eleventyConfig object from .eleventy.js as the first param to extension functions`, () => {
  const _eleventyConfig = _.cloneDeep(eleventyConfig)
  const _eleventySetup = _.cloneDeep(eleventySetup)
  let revert
  _eleventySetup.filters.identity = jest.fn((eleventyConfig, input) => [
    typeof eleventyConfig,
    input,
  ])

  beforeEach(() => {
    revert = extensions.__set__({
      _eleventyConfig,
      _eleventySetup,
    })
  })

  afterEach(() => {
    revert()
    _eleventySetup.filters.identity.mockClear()
  })

  test(`Happy path curries the eleventyConfig object`, () => {
    const sut = _curryExtension(`filters`, `identity`)
    expect(typeof sut).toBe('function')
    const result = sut(`test`)
    expect(result[0]).toBe(`object`)
    expect(result[1]).toMatch(/test/)
    expect(_eleventySetup.filters.identity).toHaveBeenCalledTimes(1)
  })
})

describe(`Adds extension functions by type`, () => {
  let revert
  const _eleventyConfig = {
    addFilter: jest.fn((name, cb) => [name, typeof cb]),
  }
  const _eleventySetup = {
    filters: {
      identity: jest.fn((eleventyConfig, input) => [typeof eleventyConfig, input]),
    },
  }

  beforeEach(() => {
    revert = extensions.__set__({
      _eleventyConfig,
      _eleventySetup,
    })
  })

  afterEach(() => {
    revert()
    _eleventySetup.filters.identity.mockClear()
    _eleventyConfig.addFilter.mockClear()
  })

  test(`Adds all extension functions by type`, () => {
    _addExtensionsByType(`filters`)
    expect(_eleventyConfig.addFilter).toHaveBeenCalledTimes(1)
    expect(_eleventyConfig.addFilter).toHaveBeenCalledWith(`identity`, expect.any(Function))
  })

  test(`Does nothing if given invalid type`, () => {
    _addExtensionsByType(`notavalidtype`)
    expect(_eleventyConfig.addFilter).not.toHaveBeenCalled()
  })
})
