export {};

declare global {
  /**
   * Minified helper to set a property on an object.
   *
   * @param target - The object to set the property on.
   * @param propertyName - The name of the property.
   * @param propertyValue - The value to set.
   * @returns The set property value.
   * @unofficial
   */
  function Tl(target: object, propertyName: string, propertyValue: unknown): unknown;
}
