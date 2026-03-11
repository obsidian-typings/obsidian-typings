export {};

declare global {
  /**
   * Checks if the given object is a boolean.
   *
   * @param obj - The object to check.
   * @returns `true` if the object is a boolean, `false` otherwise.
   * @example
   * ```ts
   * console.log(isBoolean(false)); // true
   * console.log(isBoolean('not a boolean')); // false
   * ```
   * @official
   */
  function isBoolean(obj: unknown): obj is boolean;
}
