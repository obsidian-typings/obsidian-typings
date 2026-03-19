export {};

declare global {
  /**
   * Minified helper to omit specified properties from an object.
   *
   * @param target - The source object to omit properties from.
   * @param propertyNames - The names of the properties to exclude.
   * @returns A new object without the specified properties.
   * @unofficial
   */
  function mo(target: object, propertyNames: string[]): object;
}
