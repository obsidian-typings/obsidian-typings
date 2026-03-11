export {};

declare module 'obsidian' {
  /**
   * Remove a custom icon from the library.
   *
   * @param iconId - the icon ID.
   *
   * @example
   * ```ts
   * removeIcon('my-icon');
   * ```
   *
   * @official
   */

  export function removeIcon(iconId: string): void;
}
