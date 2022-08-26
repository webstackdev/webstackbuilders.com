/**
 * Jest configuration for Node environment, set up with TypeScript
 */
import type { Config } from 'jest'
import commonJestConfig from './jest.config.common'

const config: Config = {
  /** Add shared configuration options */
  ...commonJestConfig,

  displayName: {
    name: 'NODE',
    color: 'blue',
  },
  bail: 1,
  /** Set this correctly to avoid getting a confusing error message when it is
   * referenced later in a path string. It will say something like 'Module
   * <rootDir>/config/polyfills.js in the setupFiles option was not found.'
   */
  rootDir: './../../',

  /** A list of paths to directories that Jest should use to search for test files */
  roots: [
    '<rootDir>/eleventy/config',
    '<rootDir>/eleventy/filters',
    '<rootDir>/eleventy/handlers',
    '<rootDir>/eleventy/nunjucksAsyncShortcodes',
    '<rootDir>/eleventy/nunjucksFilters',
    '<rootDir>/eleventy/nunjucksShortcodes',
    '<rootDir>/eleventy/utils',
    '<rootDir>/lambda',
    '<rootDir>/scripts',
  ],
  /** Jest default environment is Node.js */
  testEnvironment: 'node',
}

export default config