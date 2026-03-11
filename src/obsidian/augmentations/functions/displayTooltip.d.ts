import type { TooltipOptions } from 'obsidian';

export {};

declare module 'obsidian' {
  /**
   * Manually trigger a tooltip that will appear over the provided element.
   * To display a tooltip on hover, use {@link setTooltip} instead.
   *
   * @param newTargetEl - The element to display the tooltip over.
   * @param content - The content of the tooltip.
   * @param options - The options for the tooltip.
   *
   * @example
   * ```ts
   * displayTooltip(document.body, 'foo');
   * ```
   *
   * @official
   * @since 1.8.7
   */

  export function displayTooltip(
    newTargetEl: HTMLElement,
    content: DocumentFragment | string,
    options?: TooltipOptions
  ): void;
}
