import type { QueryForFuzzySearch } from '../../internals/QueryForFuzzySearch.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Fuzzy search.
   *
   * @param queryForFuzzySearch - the query for fuzzy search.
   * @param text - the text to search in.
   * @returns the search result or `null` if the text does not match the query.
   *
   * @unofficial
   */

  export function fuzzySearch(queryForFuzzySearch: QueryForFuzzySearch, text: string): null | SearchResult;
}
