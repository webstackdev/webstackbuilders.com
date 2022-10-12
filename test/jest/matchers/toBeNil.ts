/**
 * From 'jest-extended', but that library does not compile due to bad typings
 */
import type { MatcherFunction } from 'expect'

export const toBeNil: MatcherFunction = function (actual: unknown) {
  const { printReceived, matcherHint } = this.utils

  const passMessage =
    matcherHint('.not.toBeNil', 'received', '') +
    '\n\n' +
    'Expected value not to be null or undefined, received:\n' +
    `  ${printReceived(actual)}`

  const failMessage =
    matcherHint('.toBeNil', 'received', '') +
    '\n\n' +
    'Expected value to be null or undefined, received:\n' +
    `  ${printReceived(actual)}`

  /* eslint-disable-next-line no-null/no-null */
  const pass = actual === undefined || actual === null
  return { pass, message: () => (pass ? passMessage : failMessage) }
}

declare module 'expect' {
  interface Matchers<R> {
    toBeNil(): R
  }
}
