/**
 * This file is called by `setupFilesAfterEnv`, which is executed before each test
 * file is executed but after the testing framework is installed in the environment.
 */
import 'jest-extended'
import 'jest-extended/all'
import { expect } from '@jest/globals'
import { toHaveInProtoChain } from './matchers'

/** Add custom Jest matchers */
expect.extend({ toHaveInProtoChain })
