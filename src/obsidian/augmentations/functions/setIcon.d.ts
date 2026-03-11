import type { IconName } from 'obsidian';

export {};

declare module 'obsidian' {
  /**
   * Insert an SVG into the element from an iconId. Does nothing if no icon associated with the iconId.
   *
   * @param parent - the HTML element to insert the icon.
   * @param iconId - the icon ID.
   * @see The Obsidian icon library includes the {@link https://lucide.dev/ Lucide icon library}, any icon name from their site will work here.
   *
   * @example
   * ```ts
   * setIcon(document.body, 'dice');
   * ```
   *
   * @official
   */

  export function setIcon(parent: HTMLElement, iconId: IconName): void;
}
