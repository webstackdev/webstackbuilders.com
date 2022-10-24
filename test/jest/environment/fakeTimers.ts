import { jest } from '@jest/globals'

/**
 * @returns true with fake timers, false with real timers
 */
type FakeTimerState = { isTimerFaked: boolean }
export const checkFakedTimerStatus = (): FakeTimerState => {
  const isJestDefined = typeof jest !== 'undefined'
  const isSetTimeoutDefined = typeof setTimeout !== 'undefined'
  const isSetTimeoutMocked = Object.prototype.hasOwnProperty.call(setTimeout, '_isMockFunction')
  const isSetTimeoutClocked = Object.prototype.hasOwnProperty.call(setTimeout, 'clock')
  return {
    isTimerFaked: isJestDefined && isSetTimeoutDefined && (isSetTimeoutMocked || isSetTimeoutClocked)
  }
}

/**
 * This routine allows script that requires real timers, like Webpack and Eleventy
 * programmatic, to be called from within Jest JSDOM tests that are setting fake timers.
 * The routines will check if any fake timers have been set and error if so. If not, real
 * timers are restored and then the fake timers turned back on through subsequent method calls.
 *
 * @param isTimerFaked true if fake timers are in use, false if real timers in use
 */
export const ensureRealTimers = ({ isTimerFaked }: FakeTimerState): void => {
  if (!isTimerFaked) return
  /** messy way to get calling function name, Function.callee throws in strict mode */
  let callerName: string
  try {
    throw new Error()
  } catch (err) {
    const regex = /(\w+)@|at (\w+) \(/g
    /** skip the first frame of stack trace as it is this function */
    regex.exec((err as Error).stack!)
    /** stack trace frame for the function calling here */
    const matches = regex.exec((err as Error).stack!) as RegExpExecArray
    callerName = matches[1] || matches[2] || `unknown`
  }
  const timersOutstanding = jest.getTimerCount()
  if (isTimerFaked && timersOutstanding) {
    throw new Error(
      `${callerName} was called with fake timers pending. ${callerName}() should be called before any code that sets timers when fake timers are in use.`
    )
  }

  if (isTimerFaked) jest.useRealTimers()
}

export const restoreTimers = ({ isTimerFaked }: FakeTimerState): void => {
  if (isTimerFaked) jest.useFakeTimers()
}
