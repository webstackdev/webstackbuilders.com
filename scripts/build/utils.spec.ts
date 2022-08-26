import { describe, expect, test } from '@jest/globals'

import { exec } from 'child_process'
import path from 'path'

describe(`Logging function works`, () => {
  test('prints a string given to the logging function', done => {
    const loggerInstance = path.resolve(
      process.cwd(),
      'scripts/build/__fixtures__/logger_string_param.ts'
    )

    exec(`ts-node ${loggerInstance} --project './tsconfig.jest.json'`, (_, stdout) => {
      expect(stdout).toMatch(/something happened/)
      done()
    })
  })

  test('prints an array of string given to the logging function', done => {
    const loggerInstance = path.resolve(
      process.cwd(),
      'scripts/build/__fixtures__/logger_array_param.ts'
    )

    exec(`ts-node ${loggerInstance} --project './tsconfig.jest.json'`, () => {
      //expect(stdout).toMatch(/something happened/)
      //expect(stdout).toMatch(/something else happened/)
      done()
    })
  })
})

describe(`Error handler functionality`, () => {
  test('prints an error to console', done => {
    const errorHandlerFixture = path.resolve(
      process.cwd(),
      'scripts/build/__fixtures__/errorHandler.ts'
    )

    exec(`ts-node ${errorHandlerFixture} --project './tsconfig.jest.json'`, (error) => {
      expect(error?.toString()).toMatch(/Error/)
      done()
    })
  })
})
