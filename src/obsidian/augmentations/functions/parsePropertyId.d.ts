export {};

declare module 'obsidian' {
  /**
   * Split a Bases property ID into constituent parts.
   *
   * @official
   * @since 1.10.0
   */

  export function parsePropertyId(propertyId: BasesPropertyId): BasesProperty;
}
