/**
 * Utility types used across multiple modules
 */

/** Type for event listener functions passed in an array */
export type ScriptInit = () => void

/** Type for function operating on add event listener */
export type ScriptInitFn = (scripts: ScriptInit[]) => void

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
export const voidFn = () => {}
