/**
 * Jest configured set up with TypeScript
 */
/** @type {import('@types/jest').Config.InitialOptions} */
module.exports = {
  coverageDirectory: `<rootDir>/coverage`,
  preset: `ts-jest`,
  /** A list of paths to directories that Jest should use to search for test files */
  roots: ['<rootDir>/eleventy', '<rootDir>/src/assets/script'],
  /** Ignore any tests in the node_modules, .cache, or public directories */
  testPathIgnorePatterns: [`node_modules`, `<rootDir>/public`],
  /** Some DOM APIs such as localStorage are unhappy with the default about:blank */
  testURL: `http://localhost`,
  /** Set up for Babel config */
  transform: {
    '^.+\\.[jt]s$': `<rootDir>/jest/jest-preprocess.js`,
  },
  verbose: true,
}
