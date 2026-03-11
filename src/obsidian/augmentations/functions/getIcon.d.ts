export {};

declare module 'obsidian' {
  /**
   * Create an SVG from an iconId. Returns `null` if no icon associated with the iconId.
   *
   * @param iconId - the icon ID.
   * @returns the SVG element or `null` if no icon associated with the iconId.
   *
   * @example
   * ```ts
   * console.log(getIcon('dice')); // <svg>...</svg>
   * ```
   *
   * @official
   */

  export function getIcon(iconId: string): null | SVGSVGElement;
}
