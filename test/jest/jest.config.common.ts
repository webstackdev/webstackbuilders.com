/**
 * Shared Jest configuration set up with TypeScript for all environments. When using
 * TypeScript Jest config files, Jest will use `ts-node` to compile the config file.
 * `ts-jest` doesn't take part in that process.
 */

import * as dotenv from 'dotenv'
import type { Config } from '@jest/types'

export type ConfigOptions = Config.InitialOptions

// load environmental variables if not already loaded
if (!process.env['ELEVENTY_ENV_VARS_INIT']) {
  dotenv.config({ path: './.env.local' })
}

const config: ConfigOptions = {
  /** Directory where Jest should output coverage files */
  coverageDirectory: `<rootDir>/coverage`,
  /** Ignore any tests in the node_modules, .cache, or public directories */
  testPathIgnorePatterns: [`node_modules`, `<rootDir>/public`],
  /** Set up for Babel config for TypeScript code */
  transform: {
    '.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.jest.json',
      },
    ],
    //require.resolve(`ts-jest`),
  },
  verbose: true,
}

export default config
