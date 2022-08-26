/**
 * Make sure global data functions are working
 */
const {
  getBuildPathsGlobalData,
  getSiteGlobalData,
  getStatsGlobalData,
} = require('./globalData')

describe('Build paths object works', () => {
  test('returns valid paths object', () => {
    const sut = getBuildPathsGlobalData()
    expect(sut).toBeInstanceOf(Object)
    /** Make sure that at least the build directory is set */
    expect(sut[`buildDir`]).toEqual(expect.any(String))
  })
})

describe(`Returns global data objects`, () => {
  test(`Returns global site object`, () => {
    const sut = getSiteGlobalData()
    expect(sut).toBeInstanceOf(Object)
    expect(sut[`author`]).toEqual(expect.any(String))
    expect(sut[`baseUrl`]).toEqual(expect.any(String))
    expect(sut[`description`]).toEqual(expect.any(String))
    expect(sut[`domain`]).toEqual(expect.any(String))
    expect(sut[`email`]).toEqual(expect.any(String))
    expect(sut[`lang`]).toEqual(expect.any(String))
    expect(sut[`locale`]).toEqual(expect.any(String))
    expect(sut[`organization`]).toEqual(expect.any(String))
    expect(sut[`title`]).toEqual(expect.any(String))
  })

  test(`Returns global stats object`, () => {
    const sut = getStatsGlobalData()
    expect(sut).toBeInstanceOf(Object)
    expect(sut[`env`]).toEqual(expect.any(String))
    expect(sut[`timestamp`]).toEqual(expect.any(String))
  })
})


describe('Site stats global data works', () => {
  test('returns valid stats object', () => {
    expect(getStatsGlobalData()).toBeInstanceOf(Object)
  })
})
