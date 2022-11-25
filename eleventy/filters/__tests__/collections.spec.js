/**
 * Unit and integration test for collections filters.
 */
const { describe, expect, test } = require('@jest/globals')
const {
  currentPage,
  exclude,
  excludeItemFromCollection,
  findById,
  slice,
  withCategory,
} = require('../collections')
const { collections } = require('../__fixtures__/collections')

describe(`collections filter tests`, () => {
  const page = { inputPath: './src/pages/about/index.md' }

  test(`current page filter returns correct page`, () => {
    expect(currentPage(undefined, collections, page).data.slug).toMatch(/test-title/)
  })

  test(`exclude filter returns filtered array`, () => {
    expect(exclude(undefined, ['pizza', 'coke'], 'coke')).toEqual(['pizza'])
  })

  test(`exclude an item from collection returns a filtered collection`, () => {
    const sut = excludeItemFromCollection(undefined, collections, page)
    expect(sut).toHaveLength(1)
    expect(sut.pop()).toHaveProperty(`fileSlug`, `test1`)
  })

  test(`return an item from an object by key`, () => {
    const dictObj = { one: 'first val', two: 'second val' }
    expect(findById(undefined, dictObj, 'one')).toMatch(`first val`)
  })

  test(`slice array as a filter`, () => {
    expect(slice(undefined, ['pizza', 'coke', 'pretzels', 'dots'], 2, 3)).toEqual(['pretzels'])
  })

  test(`returns items in a collection that match a category`, () => {
    const sut = withCategory(undefined, collections, 'site')
    expect(sut).toBeInstanceOf(Array)
    expect(sut).toHaveLength(1)
  })

    test(`returns items in a collection that match a list of categories`, () => {
      const sut = withCategory(undefined, collections, 'site, code')
      expect(sut).toBeInstanceOf(Array)
      expect(sut).toHaveLength(2)
    })
})
