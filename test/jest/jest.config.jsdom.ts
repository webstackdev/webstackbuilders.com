/**
 * Jest configuration for JSDOM browser environment, set up with TypeScript
 */
import commonJestConfig from './jest.config.common'
import type { ConfigOptions } from './jest.config.common'

const envServerPort = process.env['ELEVENTY_DEV_SERVER_PORT']
const devServer = envServerPort ? `http://localhost:${envServerPort}` : 8081

const config: ConfigOptions = {
  /** Add shared configuration options */
  ...commonJestConfig,

  displayName: {
    name: 'JSDOM',
    color: 'yellow',
  },

  /** Set this correctly to avoid getting a confusing error message when it is
   * referenced later in a path string. It will say something like 'Module
   * <rootDir>/config/polyfills.js in the setupFiles option was not found.'
   */
  rootDir: './../../',

  /** A list of paths to directories that Jest should use to search for test files */
  roots: [
    '<rootDir>/eleventy/markdown',
    '<rootDir>/eleventy/pairedShortcodes',
    '<rootDir>/eleventy/shortcodes',
    '<rootDir>/src/assets/script',
    '<rootDir>/scripts/build/__tests__/jsdom',
  ],
  /**
   * Executed before each test file is executed but after
   * the testing framework is installed in the environment
   */
  setupFilesAfterEnv: [`<rootDir>/test/jest/jest.setup.jsdom.ts`],
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
    referrer: devServer,
    /**
     * Execute external scripts included via <script src="">, load external style
     * sheets, images, and iframes.
     */
    resources: 'usable',
    /** Some DOM APIs such as localStorage are unhappy with the default about:blank */
    url: devServer,
  },
  /** Skip any tests that match these regexp pattern strings */
  testPathIgnorePatterns: [],
}

export default config
