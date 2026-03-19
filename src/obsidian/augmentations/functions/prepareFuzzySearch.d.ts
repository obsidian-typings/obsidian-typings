import type { SearchResult } from 'obsidian';

export {};

declare module 'obsidian' {
  /**
   * Construct a fuzzy search callback that runs on a target string.
   * Performance may be an issue if you are running the search for more than a few thousand times.
   * If performance is a problem, consider using `prepareSimpleSearch` instead.
   *
   * @param query - the fuzzy query.
   * @return fn - the callback export function to apply the search on or `null` if the query is empty.
   *
   * @official
   */

  export function prepareFuzzySearch(query: string): (text: string) => null | SearchResult;
}
