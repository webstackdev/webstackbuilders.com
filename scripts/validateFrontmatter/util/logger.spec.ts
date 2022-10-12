import { describe, expect, jest, test } from '@jest/globals'
import { log } from '../../build/utils'
import { logResults } from './logger'

jest.mock('../../build/utils')
const logMock = log as jest.MockedFunction<typeof log>

describe('Logging results of frontmatter lint', () => {
  test('should log success with path to linted file if no errors', () => {
    const pagePath = `/some/file/path`
    logResults(pagePath, undefined)
    expect(logMock.mock.calls).toHaveLength(2)
    expect(logMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Front matter validated for page:",
          "green",
        ],
        [
          "/some/file/path
      ",
          "yellow",
        ],
      ]
    `)
  })

  test('should log errors with path to linted file', () => {
    const pagePath = `/some/file/path`
    const errorsToLog = [new Error(`first error`), new Error(`second error`)]
    logResults(pagePath, errorsToLog)
    expect(logMock.mock.calls?.length).toBeGreaterThanOrEqual(3)
    expect(logMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Front matter validated for page:",
          "green",
        ],
        [
          "/some/file/path
      ",
          "yellow",
        ],
        [
          "Frontmatter validation error in file:",
          "red",
        ],
        [
          "/some/file/path
      ",
          "red",
        ],
        [
          "> Error: first error",
          "red",
        ],
        [
          "> Error: second error",
          "red",
        ],
        [
          "
      ",
        ],
      ]
    `)
  })
})
