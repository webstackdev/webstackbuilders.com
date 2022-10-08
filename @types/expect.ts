/**
 * Jest custom matcher type definitions
 */
import type { Matchers as JestMatchers } from 'expect'

declare module 'expect' {
  /** Public call signature for the matcher */
  // export declare interface Matchers<R extends void | Promise<void>> {
  export interface Matchers<R extends void | Promise<void>> extends JestMatchers<R> {
    toHaveInProtoChain(expected: unknown, ...chain: unknown[]): R
  }
}
