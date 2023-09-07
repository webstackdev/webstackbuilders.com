declare module 'expect' {
  type Constructor = {
    new (...args: unknown[]): unknown
  }

  export interface Matchers<R> {
    /**
     * Custom Jest matchers
     */
    toHaveInProtoChain(...chain: Constructor[]): R
    /**
     * jest-extended typings do not work, so used matchers are manually included:
     * https://github.com/jest-community/jest-extended/issues/447
     * https://github.com/jest-community/jest-extended/issues/408
     */
    toBeNil(): R
    toBeObject(): R
  }
}
