/**
 * Jest configured set up with TypeScript
 */
/** @type {import('@types/jest').Config.InitialOptions} */

// load environmental variables if not already loaded
if (!process.env.ELEVENTY_ENV_VARS_INIT) {
  require('dotenv').config({ path: './.env.local' })
}

module.exports = {
  /** Directory where Jest should output coverage files */
  coverageDirectory: `<rootDir>/coverage`,
  /**  preset used as a base for Jest config */
  preset: `ts-jest`,
  /** A list of paths to directories that Jest should use to search for test files */
  roots: ['<rootDir>/eleventy', '<rootDir>/src/assets/script'],
  /**
   * Executed before each test file is executed but after
   * the testing framework is installed in the environment
   */
  setupFilesAfterEnv: [`<rootDir>/test/jest/jest.setup.js`],
  /** Jest default environment is Node.js */
  testEnvironment: 'jsdom',
  /** Options passed to JSDOM constructor to override defaults */
  testEnvironmentOptions: {
    /**
     * Preserve location info produced by the HTML parser, allows reporting line
     * numbers in exception stack traces for code running inside <script> elements
     */
    includeNodeLocations: true,
    /** enable window.requestAnimationFrame() and window.cancelAnimationFrame() */
    pretendToBeVisual: true,
    /** Sets the value read from document.referrer, defaults to empty string (no referrer) */
    referrer: `http://localhost:${process.env.ELEVENTY_DEV_SERVER_PORT}`,
    /**
     * Execute external scripts included via <script src="">, load external style
     * sheets, images, and iframes.
     */
    resources: 'usable',
    /** Some DOM APIs such as localStorage are unhappy with the default about:blank */
    url: `http://localhost:${process.env.ELEVENTY_DEV_SERVER_PORT}`,
  },
  /** Ignore any tests in the node_modules, .cache, or public directories */
  testPathIgnorePatterns: [`node_modules`, `<rootDir>/public`],
  /** Set up for Babel config for TypeScript code */
  transform: {
    '^.+\\.[jt]s$': `<rootDir>/test/jest/jest.transform.js`,
  },
  verbose: true,
}
