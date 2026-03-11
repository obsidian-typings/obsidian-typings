import type { TooltipOptions } from 'obsidian';

export {};

declare module 'obsidian' {
  /**
   * Set a tooltip on an element.
   *
   * @param el - The element to show the tooltip on.
   * @param tooltip - The tooltip text to show.
   * @param options - The options for the tooltip.
   *
   * @example
   * ```ts
   * setTooltip(document.body, 'foo');
   * ```
   *
   * @official
   * @since 1.4.4
   */

  export function setTooltip(el: HTMLElement, tooltip: string, options?: TooltipOptions): void;
}
