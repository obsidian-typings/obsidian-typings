import type { SearchResult } from 'obsidian';

export {};

declare module 'obsidian' {
  /**
   * Render the results of a search.
   *
   * @param el - The element to render the results to.
   * @param text - The text to render the results to.
   * @param result - The result to render.
   * @param offset - The offset to render the results to.
   *
   * @example
   * ```ts
   * renderResults(document.body, 'foo', {
   *     score: 0.5,
   *     matches: [[0, 3]],
   * });
   * ```
   *
   * @official
   */

  export function renderResults(el: HTMLElement, text: string, result: SearchResult, offset?: number): void;
}
