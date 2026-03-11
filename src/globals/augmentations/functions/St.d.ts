export {};

declare global {
  /**
   * Minified helper to merge source properties into target object.
   *
   * @param target - The target object to merge properties into.
   * @param source - The source object to merge properties from.
   * @returns The target object with merged properties.
   * @unofficial
   */
  function St(target: object, source: object | undefined): object;
}
