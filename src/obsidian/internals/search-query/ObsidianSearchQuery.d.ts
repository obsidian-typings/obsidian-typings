import type {
  App,
  TFile
} from 'obsidian';

import type { SearchMatchContext } from './SearchMatchContext.d.ts';
import type { SearchMatcher } from './SearchMatcher.d.ts';
import type { SearchMatchResult } from './SearchMatchResult.d.ts';
import type { SearchRequiredInputs } from './SearchRequiredInputs.d.ts';

/**
 * A parsed Obsidian search query, compiled from a raw query string into a matcher.
 * Used by global search, the file explorer filter, and backlink search.
 *
 * @public
 * @unofficial
 */
export interface ObsidianSearchQuery {
  /**
   * Reference to the app.
   */
  app: App;

  /**
   * Whether the query is matched case-sensitively.
   */
  caseSensitive: boolean;

  /**
   * The root of the compiled matcher tree, or `null` when the query compiles to nothing (an empty query).
   */
  matcher: null | SearchMatcher;

  /**
   * The raw query string.
   */
  query: string;

  /**
   * The inputs the matcher requires to evaluate a file, or `null` when there is no matcher.
   */
  requiredInputs: null | SearchRequiredInputs;

  /**
   * Runs the matcher against a match context.
   *
   * @param context - The context to match.
   * @returns The match result, an empty result when the matcher answered `undefined`, or `null` on no match.
   */
  _match(context: SearchMatchContext): null | SearchMatchResult;

  /**
   * Constructor.
   *
   * To get the constructor instance, use {@link getObsidianSearchQueryConstructor} from `obsidian-typings/implementations`.
   *
   * @param app - The app.
   * @param query - The raw query string.
   * @param caseSensitive - Whether to match case-sensitively.
   * @param operators - The query operators to parse with. Defaults to the built-in set (`file:`, `path:`, `tag:`, ...).
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__?(app: App, query: string, caseSensitive: boolean, operators?: Record<string, unknown>): this;

  /**
   * Matches a file (and optionally its content) against the query.
   *
   * @param file - The file to match.
   * @param content - The file content.
   * @returns The match result, or `null` on no match.
   */
  match(file: TFile, content: string): null | SearchMatchResult;

  /**
   * Matches content against the query.
   *
   * @param content - The content to match.
   * @returns The match result, or `null` on no match.
   */
  matchContent(content: string): null | SearchMatchResult;

  /**
   * Matches a file path's name against the query.
   *
   * @param path - The file path.
   * @returns The match result, or `null` on no match.
   */
  matchFilename(path: string): null | SearchMatchResult;

  /**
   * Matches a file path against the query.
   *
   * @param path - The file path.
   * @returns The match result, or `null` on no match.
   */
  matchFilepath(path: string): null | SearchMatchResult;

  /**
   * Matches a tag against the query.
   *
   * @param tag - The tag to match.
   * @returns The match result, or `null` on no match.
   */
  matchTag(tag: string): null | SearchMatchResult;
}
