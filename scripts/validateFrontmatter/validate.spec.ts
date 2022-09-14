import { mockCwd } from 'mock-cwd'
import testingSchema from './schemas/__fixtures__/testing'
import testing2Schema from './schemas/__fixtures__/testing2'
import {
  getSchemaNameAndOverrideJson,
  getSchemaRoot,
  getSchema,
  getSchemas,
  getSchemaWithOverrides,
  matchFunctionSyntax,
  mergeSchemas,
  pageSchemaResolver,
  parseOverride,
} from './validate'

describe(`Extract over-ride object when using function syntax`, () => {
  test(`Regex works`, () => {
    const sut = matchFunctionSyntax(`avatarSchema({ "image": { "required": true } })`)
    expect(sut).toBeTruthy()
    expect(sut).toHaveLength(3)
    expect(sut).toContain(`avatarSchema`)
    expect(sut).toContain(`{ "image": { "required": true } }`)
  })

  test(`Handles path to allow testing from __fixtures__ directory`, () => {
    const sut = matchFunctionSyntax(`__fixtures__/avatarSchema({})`)
    expect(sut).toContain(`__fixtures__/avatarSchema`)
    expect(sut).toContain(`{}`)
  })
})

describe(`Merges two schemas with the second over-riding the first`, () => {
  test(`Should apply override partial`, () => {
    const override = JSON.parse(`{ "first": { "description": "Modified first property" } }`)
    const sut = mergeSchemas(testingSchema, override)
    expect(sut).toEqual(
      expect.objectContaining({
        first: expect.objectContaining({
          description: `Modified first property`,
        }),
      })
    )
    expect(sut).not.toEqual(testingSchema) // make sure merge isn't mutating a parameter
  })

  test(`Should apply merge two schemas`, () => {
    const sut = mergeSchemas(testingSchema, testing2Schema)
    expect(sut).toHaveProperty(`first`)
    expect(sut).toHaveProperty(`second`)
    expect(sut).toHaveProperty(`third`)
  })
})

describe(`Normalizes schema names to file names`, () => {
  test(`Correct schema root name is returned`, () => {
    const sut = getSchemaRoot(`avatarSchema`)
    expect(sut).toMatch(`avatar`)
  })

  test(`Malformed schema names throw`, () => {
    expect(() => getSchemaRoot(`avatar`)).toThrow()
  })
})

describe(`Returns keyed object with normalized schema name and the JSON override string`, () => {
  test(`Happy path`, () => {
    const sut = getSchemaNameAndOverrideJson(`avatarSchema({ "image": { "required": true } })`)
    expect(sut).toEqual(
      expect.objectContaining({
        normalizedSchemaName: `avatar`,
        overrideJson: `{ "image": { "required": true } }`,
      })
    )
  })
})

describe(`Parses a schema into JSON`, () => {
  test(`Returns a valid object for valid JSON string`, () => {
    const sut = parseOverride(`{ "image": { "required": true } }`, `avatarSchema`)
    expect(sut).toEqual(
      expect.objectContaining({
        image: expect.objectContaining({
          required: true,
        }),
      })
    )
  })

  test(`Malformed JSON schema throws`, () => {
    expect(() => parseOverride(`{}}`, `avatarSchema`)).toThrow()
  })
})

describe(`Get schema from disk by name and apply override to it when using function syntax`, () => {
  test(`Gets schema and applies override`, async () => {
    const sut = await getSchemaWithOverrides(
      `__fixtures__/testingSchema({ "first": { "description": "Modified first property" } })`
    )
    expect(sut).toHaveProperty(`first`)
    expect(sut).toHaveProperty(`second`)
    expect(sut).toEqual(
      expect.objectContaining({
        first: expect.objectContaining({
          description: `Modified first property`,
        }),
      })
    )
  })
})

describe(`Get a schema from file`, () => {
  test(`Loads a schema`, async () => {
    const sut = await getSchema(`__fixtures__/testingSchema`)
    expect(sut).toHaveProperty(`first`)
    expect(sut).toHaveProperty(`second`)
  })
})

describe(`Build a schema from subschemas`, () => {
  test(`Builds a schema from schema properties array`, async () => {
    const sut = await getSchemas([
      `__fixtures__/testingSchema({ "first": { "description": "Modified first property" } })`,
      `__fixtures__/testing2Schema`,
      `__fixtures__/testing3Schema`,
    ])
    expect(sut).toHaveProperty(`first`)
    expect(sut).toHaveProperty(`second`)
    expect(sut).toHaveProperty(`third`)
    expect(sut).toHaveProperty(`fourth`)
    expect(sut).toEqual(
      expect.objectContaining({
        first: expect.objectContaining({
          description: `Modified first property`,
        }),
      })
    )
  })
})

describe(`Get an object with resolved glob and schema when given multiple subschemas`, () => {
  test(`Loads a schema`, async () => {
    const mock = mockCwd('/home')
    const sut = await pageSchemaResolver({
      glob: 'test/path',
      properties: [`__fixtures__/testingSchema`],
    })
    mock.restore()

    expect(sut).toEqual(
      expect.objectContaining({
        glob: `/home/test/path`,
        properties: expect.objectContaining({
          first: expect.objectContaining({
            description: `The first property`,
            type: `string`,
          }),
          second: expect.objectContaining({
            description: `The second property`,
            type: `string`,
          }),
        }),
      })
    )
  })
})
