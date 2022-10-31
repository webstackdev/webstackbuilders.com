/**
 * Unit tests for setup state module
 */
import { describe, expect, jest, test } from '@jest/globals'
import { JSDOM } from 'jsdom'
import type { MockInstance } from 'jest-mock'
import { ListenerState } from '../../environment/state'
const { window } = new JSDOM()
const { document } = window

describe('Event listener tracking state works', () => {
  let windowSpy: MockInstance<typeof window.addEventListener>
  let documentSpy: MockInstance<typeof document.addEventListener>

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'addEventListener')
    documentSpy = jest.spyOn(document, 'addEventListener')
  })

  afterEach(() => {
    windowSpy.mockRestore()
    documentSpy.mockRestore()
  })

  test('caches different add event listeners for window and document', () => {
    //windowSpy.mockImplementation(() => undefined)
    const state = new ListenerState(window as unknown as Window, document)
    expect(state.originalWindowAddEventListener).not.toEqual(state.originalDocumentAddEventListener)
  })
})
