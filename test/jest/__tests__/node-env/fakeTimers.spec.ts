/**
 * Tests for test setup fake timer handling routines
 */
import { describe, expect, test } from '@jest/globals'
import { checkFakedTimerStatus, ensureRealTimers, restoreTimers } from '../../environment/fakeTimers'

describe(`isTimerFaked works`, () => {
  test(`isTimerFaked returns true with fake timers`, () => {
    jest.useFakeTimers()
    const { isTimerFaked } = checkFakedTimerStatus()
    expect(isTimerFaked).toBeTruthy()
    jest.useRealTimers()
  })

  test(`isTimerFaked returns false with real timers`, () => {
    jest.useRealTimers()
    const { isTimerFaked } = checkFakedTimerStatus()
    expect(isTimerFaked).toBeFalsy()
  })
})

describe(`ensureRealTimers works`, () => {
  test(`ensureRealTimers sets real timers if timers are faked`, () => {
    jest.useFakeTimers()
    ensureRealTimers({ isTimerFaked: true })
    const { isTimerFaked } = checkFakedTimerStatus()
    expect(isTimerFaked).toBeFalsy()
  })

  test(`ensureRealTimers does nothing if real timers are in use`, () => {
    jest.useRealTimers()
    ensureRealTimers({ isTimerFaked: false })
    const { isTimerFaked } = checkFakedTimerStatus()
    expect(isTimerFaked).toBeFalsy()
  })
})

describe(`ensureRealTimers handles outstanding timers`, () => {
  test(`ensureRealTimers throws if fake timers in use and timers are outstanding`, () => {
    jest.useFakeTimers()
    setImmediate(() => {})
    expect(() => ensureRealTimers({ isTimerFaked: true })).toThrowError()
    jest.useRealTimers()
  })

  test(`ensureRealTimers does nothing if real timers in use and timers are outstanding`, () => {
    jest.useRealTimers()
    setImmediate(() => {})
    ensureRealTimers({ isTimerFaked: false })
    const { isTimerFaked } = checkFakedTimerStatus()
    expect(isTimerFaked).toBeFalsy()
  })
})

describe(`restoreTimers works`, () => {
  test(`restoreTimers restores fake timers when fake timers in use in test`, () => {
    jest.useFakeTimers()
    restoreTimers({ isTimerFaked: true })
    const { isTimerFaked } = checkFakedTimerStatus()
    expect(isTimerFaked).toBeTruthy()
    jest.useRealTimers()
  })

  test(`restoreTimers does nothing when real timers in use in test`, () => {
    jest.useRealTimers()
    restoreTimers({ isTimerFaked: false })
    const { isTimerFaked } = checkFakedTimerStatus()
    expect(isTimerFaked).toBeFalsy()
  })
})
