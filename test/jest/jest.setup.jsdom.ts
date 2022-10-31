/**
 * This file is called by `setupFilesAfterEnv`, which is executed before each test
 * file is executed but after the testing framework is installed in the environment.
 * The `beforeAll` and `beforeEach` Jest globals are called with resets for the
 * JSDOM environment, which otherwise would retain state between tests (document object).
 */
import { beforeEach, expect, jest } from '@jest/globals'
import { toHaveNoViolations } from 'jest-axe'
/** Add `jest-dom` to JSDom environment browser globals */
import '@testing-library/jest-dom'
import { setQuietMode, unsetQuietMode } from './jsdomQuietMode'
import * as reset from './environment/reset'
import './utils/extendMatchers'

/** Add Axe accessibility expectations to global expect object */
expect.extend(toHaveNoViolations)

/**
 * Soft reset for JSDOM environment and globals. Removes side effects from tests,
 * but does  not reset all changes made to globals like the window and document
 * objects. Tests requiring a full JSDOM reset should be stored in separate files
 * which does a complete JSDOM reset with Jest.
 *
 * - Removes event listeners added to document and window during tests
 * - Removes keys added to document and window object during tests
 * - Remove attributes on <html> element
 * - Removes all DOM elements
 * - Resets document.documentElement HTML to <head></head><body></body>
 *
 * Suppress console output from JSDOM's browser console outlet to avoid a wall of red
 * error messages in tests that intentionally throw, but allow enabling for debugging.
 *
 * @example add pragma at top of file in a docblock:
 * @jest-environment-options {"JSDOM_QUIET_MODE": false}
 * @jest-environment-options {"something_else": false}
 */

beforeEach(() => {
  const rootElement = document.documentElement
  reset.removeRootAttributes(rootElement)
  reset.removeRootChildElements(rootElement)
  reset.restoreRootBaseElements(rootElement)
  reset.removeTrackedGlobalEventListeners()
  reset.removeGlobalKeys()
  setQuietMode({ isQuietMode: globalThis.JSDOM_QUIET_MODE }, jest)
})

afterEach(() => {
  unsetQuietMode({ isQuietMode: globalThis.JSDOM_QUIET_MODE })
})
