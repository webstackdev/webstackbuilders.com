/// <reference path="../../@types/@github-docs/frontmatter.d.ts" />
/**
 * Validate pages frontmatter against a schema
 */
import { readFileSync } from 'fs'
import path from 'path'
import frontmatter from '@github-docs/frontmatter'
import glob from 'glob'
import _ from 'lodash'
import type { AllPagesSchemas, FrontmatterSchema } from '@github-docs/frontmatter'
import { logResults } from './util/logger'

/**
 * Revalidator front matter validation schemas
 */
import { allPageSchemas } from './allPages'

const frontmatterOptions = (schema: FrontmatterSchema, markdownFilePath: string) => {
  return {
    schema,
    // The name of the file being parsed. Useful for debugging when errors occur.
    filepath: markdownFilePath,
    // If true, checks that all keys are specified as schema properties. Defaults to false.
    validateKeyNames: true,
    // If true, checks that all keys are in the same order they appear in the schema. Defaults to false.
    validateKeyOrder: false,
  }
}

/**
 * Takes a page schema object that has a `glob` key and a `properties` array key of string
 * schema names that should be ran against that glob. Returns an object with the same
 * structure but the `properties` key is an object of the schema to run against the glob.
 */

interface PageSchema {
  /** A glob pattern used to match for files that should conform to schemas in `properties` */
  glob: string
  /** The resolved schema that the files matched by `glob` should conform to */
  properties: FrontmatterSchema
}

/**
 * Extract the schema name and over-ride object when function syntax is used in `allPages.ts`.
 * Allows `_` and `/` characters so `__fixtures__` directory can be prepended in testing.
 *
 * @example avatarSchema({ "image": { "required": true } })
 */
export const matchFunctionSyntax = (schemaName: string) => {
  return /([\w_\/^(]*)\(([^)]+)\)/.exec(schemaName)
}

/**
 * Merge two schemas, overriding the first with the second if they share common paths
 */
export const mergeSchemas = (
  schema: FrontmatterSchema,
  override: Partial<FrontmatterSchema>
): FrontmatterSchema => {
  const mergedSchema = _.merge({}, schema, override)
  if (!mergedSchema) throw new Error(`There was an error merging schemas`)
  return mergedSchema
}

/**
 * Schema names have 'Schema' appended to the end, but schema file names have the ending removed
 */
export const getSchemaRoot = (schemaName: string): string => {
  const schemaRegExArray = /(.*)Schema$/.exec(schemaName)
  if (!schemaRegExArray || typeof schemaRegExArray[1] !== 'string')
    throw new Error(`Schema name is malformed, should be of the form 'customSchema': ${schemaName}`)
  return schemaRegExArray[1]
}

/**
 * Return a nice type safe object with the results of a regex on the schema name
 */
export const getSchemaNameAndOverrideJson = (schemaName: string) => {
  const match = matchFunctionSyntax(schemaName)
  if (!match || typeof match[1] !== 'string' || typeof match[2] !== 'string') {
    throw new Error(
      `The format given in file 'allPages.ts' for schema ${schemaName} looks like function syntax, but is invalid`
    )
  }
  return {
    normalizedSchemaName: getSchemaRoot(match[1]),
    overrideJson: match[2],
  }
}

export const parseOverride = (overrideJson: string, schemaName: string) => {
  try {
    return JSON.parse(overrideJson) as unknown as Partial<FrontmatterSchema>
  } catch (err) {
    throw new Error(
      `The override passed in file 'allPages.ts' for schema ${schemaName} is not valid JSON\n${err}`
    )
  }
}

/**
 * Returns a Revalidator schema object with any overrides applied when using function syntax
 */
export const getSchemaWithOverrides = async (schemaName: string) => {
  const { normalizedSchemaName, overrideJson } = getSchemaNameAndOverrideJson(schemaName)
  const schemaImport = (await import(`./schemas/${normalizedSchemaName}`))
  // CJS modules default exports are set as values to a key named 'default'
  const schema = schemaImport[`default`] as unknown as FrontmatterSchema
  const override = parseOverride(overrideJson, schemaName)
  return mergeSchemas(schema, override)
}

export const getSchema = async (schemaName: string) => {
  const normalizedSchemaName = getSchemaRoot(schemaName)
  const extendSchemaImport = await import(`./schemas/${normalizedSchemaName}`)
  // CJS modules default exports are set as values to a key named 'default'
  return extendSchemaImport[`default`] as unknown as FrontmatterSchema
}

export const getSchemas = async (schemaProperties: string[]): Promise<FrontmatterSchema> => {
  let mergedSchemas: Partial<FrontmatterSchema> = {}
  for (const schemaName of schemaProperties) {
    let extendSchema: FrontmatterSchema
    if (schemaName.includes('(')) {
      extendSchema = await getSchemaWithOverrides(schemaName)
    } else {
      extendSchema = await getSchema(schemaName)
    }
    mergedSchemas = mergeSchemas(
      mergedSchemas as unknown as FrontmatterSchema,
      extendSchema
    )
  }
  return mergedSchemas as unknown as FrontmatterSchema
}

/**
 * Returns a type safe object with the resolved glob and schema for that glob path
 */
export const pageSchemaResolver = async (schemaMetadata: AllPagesSchemas): Promise<PageSchema> => {
  return {
    glob: `${path.resolve(process.cwd(), schemaMetadata.glob)}`,
    properties: await getSchemas(schemaMetadata.properties),
  }
}

/**
 * Get the Markdown and Nunjucks files in the pages directory by glob, loop over them, and report errors
 */
const validateFrontmatter = (pageSchema: PageSchema) => {
  glob.sync(pageSchema.glob).forEach(pagePath => {
    const schema = _.pick(pageSchema, 'properties')
    const { errors } = frontmatter(
      readFileSync(pagePath, `utf8`),
      frontmatterOptions(schema, pagePath)
    )
    logResults(pagePath, errors)
  })
}

export const validate = async () => {
  await Promise.all(
    allPageSchemas.map(async schemaMetadata => {
      validateFrontmatter(await pageSchemaResolver(schemaMetadata))
    })
  )
}
