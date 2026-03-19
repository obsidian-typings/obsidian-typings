import type { QueryForFuzzySearch } from '../../internals/QueryForFuzzySearch.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Prepare a query for fuzzy search.
   *
   * @param query - the query.
   * @returns the query for fuzzy search.
   *
   * @unofficial
   */

  export function prepareQuery(query: string): QueryForFuzzySearch;
}
