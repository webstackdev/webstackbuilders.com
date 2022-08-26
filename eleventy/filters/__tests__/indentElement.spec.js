/**
 * Unit and integration test for indent element filter
 */
const { indentElement } = require('../indentElement')

describe(`indent element filter tests`, () => {
  test(`indent element filter passes integration test`, async () => {
    expect(indentElement(undefined, `<code>my stuff</code>`, 2)).toMatch(/[\u0020]{2}</)
  })
})
