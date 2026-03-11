export {};

declare global {
  /**
   * Minified helper to copy properties from source to target object.
   *
   * @param target - The target object to copy properties to.
   * @param source - The source object to copy properties from.
   * @returns The target object with copied properties.
   * @unofficial
   */
  function li(target: object, source: object): object;
}
