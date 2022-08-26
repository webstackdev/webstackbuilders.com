/**
 * Jest configured set up with TypeScript
 */
import type { Config } from 'jest'

const config: Config = {
  /** Root directory that Jest should scan for tests and modules within */
  rootDir: './',
  /** To place configuration elsewhere, point to the path of the config file in projects */
  projects: ['<rootDir>/test/jest/jest.config.jsdom.ts', '<rootDir>/test/jest/jest.config.node.ts'],
}

export default config
