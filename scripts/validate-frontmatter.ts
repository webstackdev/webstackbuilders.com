/**
 * Validate pages frontmatter against a schema
 */
const { readFileSync } = require(`fs`)
const path = require(`path`)
const frontmatter = require(`@github-docs/frontmatter`)
const glob = require(`glob`)
const _ = require('lodash')
const pc = require(`picocolors`)
const sprintf = require(`sprintf-js`).sprintf

/**
 * Revalidator front matter validation schemas
 */
const schemas = require(`./schemas`)
const { allPageSchemas } = require(`./schemas`)

const frontmatterOptions = (schema, markdownFilePath) => {
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

const pageSchemaResolver = pageSchema => {
  return {
    glob: path.resolve(pageSchema.glob),
    properties: pageSchema.properties.reduce((accumulator, value) => {
      // check if function syntax is in use and handle the deep merge:
      //   avatarSchema({ "image": { "required": true } })
      let mergedValidator
      if (value.includes('(')) {
        try {
          const match = /([\w^(]*)\(([^)]+)\)/.exec(value)
          value = match[1] // set the schema name to not have parantheses
          mergedValidator = _.merge(schemas[value], JSON.parse(match[2]))
        } catch (err) {
          console.log(
            pc.red(
              `The options over-ride passed were not valid JSON format, received ${value}:\n${err.message}`
            )
          )
          return { ...accumulator }
        }
      } else {
        mergedValidator = schemas[value]
      }
      return { ...accumulator, ...mergedValidator }
    }, {}),
  }
}

/**
 * Get the Markdown and Nunjucks files in the pages
 * directory by glob, loop over them, and report errors
 */
const validateFrontmatter = pageSchema => {
  glob.sync(pageSchema.glob).forEach(pagePath => {
    const { errors } = frontmatter(
      readFileSync(pagePath, `utf8`),
      frontmatterOptions(_.pick(pageSchema, 'properties'), pagePath)
    )

    if (errors.length) {
      // The filepaths of all errors in array should be the same, so show the first one for group
      console.log(pc.red(`Frontmatter validation error in file:`))
      console.log(`${pc.yellow(errors[0].filepath)}\n`)
      errors.forEach(error => {
        console.log(pc.red(`> Error: ${sprintf(error.message, error)}`))
      })
      console.log(`\n`)
      process.exit(1)
    } else {
      console.log(pc.green(`Front matter validated for page:`))
      console.log(`${pc.yellow(pagePath)}\n`)
    }
  })
}

allPageSchemas.forEach(schema => validateFrontmatter(pageSchemaResolver(schema)))
