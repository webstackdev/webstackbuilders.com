import type { Constructor } from '../../../test/jest/matchers/assertions'

declare module 'expect' {
  export interface Matchers<R> {
    /**
     * Custom Jest matchers
     */
    toHaveInProtoChain(...chain: Constructor[]): R
  }
}
