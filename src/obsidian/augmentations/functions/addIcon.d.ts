export {};

declare module 'obsidian' {
  /**
   * Adds an icon to the library.
   *
   * @param iconId - the icon ID.
   * @param svgContent - the content of the SVG.
   *
   * @example
   * ```ts
   * addIcon('my-icon', '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40"/></svg>');
   * ```
   *
   * @official
   */

  export function addIcon(iconId: string, svgContent: string): void;
}
