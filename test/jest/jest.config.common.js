/**
 * Shared Jest configuration set up with TypeScript for all environments
 */
/** @type {import('@types/jest').Config.InitialOptions} */

// load environmental variables if not already loaded
if (!process.env.ELEVENTY_ENV_VARS_INIT) {
  require('dotenv').config({ path: './.env.local' })
}

exports.commonJestConfig = {
  /** Directory where Jest should output coverage files */
  coverageDirectory: `<rootDir>/coverage`,
  /**  preset used as a base for Jest config */
  preset: `ts-jest`,
  /** Ignore any tests in the node_modules, .cache, or public directories */
  testPathIgnorePatterns: [`node_modules`, `<rootDir>/public`],
  /** Set up for Babel config for TypeScript code */
  transform: {
    '^.+\\.[jt]s$': `<rootDir>/test/jest/jest.transform.js`,
  },
  verbose: true,
}
