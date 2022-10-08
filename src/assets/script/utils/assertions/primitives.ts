/**
 * Type guards for primitives
 */
export function isString(message: unknown): message is string {
  return typeof message === `string` || message instanceof String
}
