/**
 * Jest configuration for Node environment, set up with TypeScript
 */
const { commonJestConfig } = require('./jest.config.common')

module.exports = {
  /** Add shared configuration options */
  ...commonJestConfig,

  displayName: {
    name: 'NODE',
    color: 'blue',
  },

  /** Set this correctly to avoid getting a confusing error message when it is
   * referenced later in a path string. It will say something like 'Module
   * <rootDir>/config/polyfills.js in the setupFiles option was not found.'
   */
  rootDir: './../../',

  /** A list of paths to directories that Jest should use to search for test files */
  roots: [
    '<rootDir>/eleventy/filters/tests',
    '<rootDir>/eleventy/handlers',
    '<rootDir>/eleventy/nunjucksAsyncShortcodes',
    '<rootDir>/eleventy/pairedShortcodes',
    '<rootDir>/eleventy/shortcodes',
    '<rootDir>/lambda',
    '<rootDir>/scripts',
  ],
  /** Jest default environment is Node.js */
  testEnvironment: 'node',
}
