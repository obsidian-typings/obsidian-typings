export {};

declare module 'obsidian' {
  /**
   * Render the matches of a search.
   *
   * @param el - The element to render the matches to.
   * @param text - The text to render the matches to.
   * @param matches - The matches to render.
   * @param offset - The offset to render the matches to.
   *
   * @example
   * ```ts
   * renderMatches(document.body, 'foo', [[0, 3]]);
   * ```
   *
   * @official
   */

  export function renderMatches(
    el: DocumentFragment | HTMLElement,
    text: string,
    matches: null | SearchMatches,
    offset?: number
  ): void;
}
