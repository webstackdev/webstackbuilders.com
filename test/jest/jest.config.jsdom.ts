/**
 * Jest configuration for JSDOM browser environment, set up with TypeScript
 */
import commonJestConfig from './jest.config.common'
import type { ConfigOptions } from './jest.config.common'

const envServerPort = process.env['ELEVENTY_DEV_SERVER_PORT']
const devServer = envServerPort
  ? `http://localhost:${envServerPort}`
  : `http://localhost:8081`

const config: ConfigOptions = {
  /** Add shared configuration options */
  // @TODO: could also be done as a preset, uses <rootDir>. Not sure if it will compile TS.
  // preset: './jest.config.common',
  ...commonJestConfig,

  cacheDirectory: '<rootDir>/.cache/jest-jsdom',

  displayName: {
    name: 'JSDOM',
    color: 'yellow',
  },

  /** Ensure spare thread available for helper workers with Eleventy and Webconfig */
  maxWorkers: '75%',

  /** Jest will make the path to this directory the <rootDir> for all paths */
  rootDir: './../../',

  /** A list of paths to directories that Jest should use to search for test files */
  roots: [
    '<rootDir>/eleventy/markdown',
    '<rootDir>/eleventy/pairedShortcodes',
    '<rootDir>/eleventy/shortcodes',
    '<rootDir>/src/assets/script',
    '<rootDir>/scripts/build/__tests__/jsdom-env',
    '<rootDir>/test/jest/__tests__/jsdom-env',
  ],
  /**
   * Executed before each test file is executed but after
   * the testing framework is installed in the environment
   */
  setupFilesAfterEnv: [`<rootDir>/test/jest/jest.setup.jsdom.ts`],
  /** Custom Jest environment */
  testEnvironment: '<rootDir>/test/jest/environment/browser-env.ts',
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
  /**  Glob patterns Jest uses to detect test files. Default shown. */
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  /** Skip any tests that match these regexp pattern strings */
  testPathIgnorePatterns: [],
}

export default config
