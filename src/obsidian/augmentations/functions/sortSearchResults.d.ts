import type { SearchResultContainer } from 'obsidian';

export {};

declare module 'obsidian' {
  /**
   * Sort search results.
   *
   * @param results - The search results to sort.
   *
   * @example
   * ```ts
   * sortSearchResults([{ match: { score: 1, matches: [[0, 3]]} }]);
   * ```
   *
   * @official
   */

  export function sortSearchResults(results: SearchResultContainer[]): void;
}
