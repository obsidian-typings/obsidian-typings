import type { SearchResult } from 'obsidian';

export {};

declare module 'obsidian' {
  /**
   * Construct a simple search callback that runs on a target string.
   *
   * @param query - the space-separated words.
   * @return fn - the callback export function to apply the search on or `null` if the query is empty.
   *
   * @official
   */

  export function prepareSimpleSearch(query: string): (text: string) => null | SearchResult;
}
