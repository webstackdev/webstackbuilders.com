/**
 * Tests for window size utilities
 */
import { describe, expect, test } from '@jest/globals'
import { getWindowDimensions } from '../window'

describe(`getWindowDimensions works`, () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    })

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: 1,
    })
  })

  test(`Gets screen size`, () => {
    expect(getWindowDimensions()).toMatchObject({
      height: 768,
      width: 1024,
    })
  })
})
