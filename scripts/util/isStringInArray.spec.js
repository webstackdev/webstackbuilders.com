/**
 * Unit test for utility method
 */

const { isStringInArray } = require(`./isStringInArray`)

describe(`Searches array for all elements of a comma-separated string`, () => {
  test(`handles single value in comma separated string`, () => {
    expect(isStringInArray(`pizza`, ['pizza', 'cake', 'cola'])).toBeTruthy()
  })

  test(`handles two comma-separated values in string`, () => {
    expect(isStringInArray(`pizza, cola`, ['pizza', 'cake', 'cola'])).toBeTruthy()
  })

  test(`string value not in list should not pass`, () => {
    expect(isStringInArray(`pizza, chips`, ['pizza', 'cake', 'cola'])).not.toBeTruthy()
  })
})
