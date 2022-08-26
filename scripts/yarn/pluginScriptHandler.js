/**
 * Yarn plugin to override default script handling behavior and
 * call a Gulp task based on the script name given to the CLI
 */
const fs = require('fs')
const util = require('util')

// @TODO: TS_NODE_PROJECT="tsconfig.gulp.json" yarn gulp build:css

/**
 * Usage object provided by clipanion for their Command class used as a base with Yarn
 */
const usage = {
    /**
     * The category of the command.
     *
     * Included in the detailed usage.
     */
    //category: `,
    /**
     * The short description of the command, formatted as Markdown.
     *
     * Included in the detailed usage.
     */
    description: ``,
    /**
     * The extended details of the command, formatted as Markdown.
     *
     * Included in the detailed usage.
     */
    details: ``,
    /**
     * Examples of the command represented as an Array of tuples.
     *
     * The first element of the tuple represents the description of the example.
     *
     * The second element of the tuple represents the command of the example.
     * If present, the leading `$0` is replaced with `cli.binaryName`.
     */
    examples: [``, ``],
}

const setupScriptEnvironment = (project, env, makePathWrapper) => {
  console.log(`🎉 Setup script environment 😎\n`)
}

const wrapScriptExecution = (
  executor,
  project,
  locator,
  scriptName,
  extra
) => {
  return () => {
    console.log(`🎉 Script execution wrapped 😎\n`)
    return executor()
  }
}

module.exports = {
  name: `plugin-hello-world`,
  factory: require => {
    const { BaseCommand } = require(`@yarnpkg/cli`)

    class HelloWorldCommand extends BaseCommand {
      /**
       * Contains the usage information for the command. If undefined, the
       * command will be hidden from the general listing.
       */
      static usage = usage

      static paths = [[`hello`]]
      // cwd: string | undefined

      async execute() {
        this.context.stdout.write(`${this.path} 😎\n`)
      }
    }

    return {
      commands: [HelloWorldCommand],
    }
  },
}
