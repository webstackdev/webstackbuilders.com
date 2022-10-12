/**
 * From 'jest-extended', but that library does not compile due to bad typings
 */
import type { MatcherFunction } from 'expect'
import { getType } from 'jest-get-type'

export const toBeObject: MatcherFunction = function (actual: unknown) {
  const { printReceived, matcherHint } = this.utils

  const passMessage =
    matcherHint('.not.toBeObject', 'received', '') +
    '\n\n' +
    'Expected value to not be an object, received:\n' +
    `  ${printReceived(actual)}`

  const failMessage =
    matcherHint('.toBeObject', 'received', '') +
    '\n\n' +
    'Expected value to be an object, received:\n' +
    `  ${printReceived(actual)}`

  const pass = getType(actual) === 'object'

  return { pass, message: () => (pass ? passMessage : failMessage) }
}

declare module 'expect' {
  interface Matchers<R> {
    toBeObject(): R
  }
}
