/**
 * Custom Jest environment to add Node `setImmediate` to JSDOM global object. Webpack
 * requires Node globals and is imported into a JSDOM environment in some tests.
 * Added as a `testEnvironment` in test/jest/jest.config.jsdom.ts
 *
 * @example In other environments, add the following in a one-line jsdoc block as the
 * first line in the file: @jest-environment ./test/jest/jest-environment-jsdom-tscompile.js
 */
const JSDOMEnvironment = require('jest-environment-jsdom').default

class JsdomTscompileEnvironment extends JSDOMEnvironment {
  async setup() {
    await super.setup()
    this.global.setImmediate = global.setImmediate
    this.global.clearImmediate = global.clearImmediate
  }

  async teardown() {
    this.global.setImmediate = undefined
    this.global.clearImmediate = undefined
    await super.teardown()
  }

  getVmContext() {
    return super.getVmContext()
  }
}

module.exports = JsdomTscompileEnvironment