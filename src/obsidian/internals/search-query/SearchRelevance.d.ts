import type {
  App,
  TFile
} from 'obsidian';

import type { ResultDomResult } from '../tree/ResultDomResult.d.ts';
import type { SearchMatcher } from './SearchMatcher.d.ts';

/**
 * Scores search results for the `byRelevance` sort order of a {@link ResultDom}.
 *
 * A search builds one per query from the query's matcher. An exact title or alias match ranks highest;
 * other matches are weighted by where each term matched and how close it was to a whole word.
 *
 * @public
 * @unofficial
 */
export interface SearchRelevance {
  /** The app instance. */
  app: App;

  /** Whether the query matches case-sensitively. */
  caseSensitive: boolean;

  /** The root of the query's compiled matcher tree. */
  matcher: SearchMatcher;

  /**
   * Check whether any term of the query matches the file's name.
   *
   * @param file - The file to check.
   * @returns Whether a query term matches the file's basename.
   */
  matchesTitle(file: TFile): boolean;

  /**
   * Compute a file's relevance score for the query. A higher score sorts first.
   *
   * @param file - The matched file.
   * @param result - The file's match result.
   * @param content - The file's content.
   * @returns The relevance score.
   */
  score(file: TFile, result: ResultDomResult, content: string): number;
}
