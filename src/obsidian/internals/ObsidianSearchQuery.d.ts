import type {
  App,
  TFile
} from 'obsidian';

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
   * The compiled matcher for the query.
   */
  matcher: unknown;

  /**
   * The raw query string.
   */
  query: string;

  /**
   * The inputs the matcher requires to evaluate a file (e.g. content, tags).
   */
  requiredInputs: unknown;

  /**
   * Matches a file (and optionally its content) against the query.
   *
   * @param file - The file to match.
   * @param content - The file content.
   * @returns The match result.
   */
  match(file: TFile, content: string): unknown;

  /**
   * Matches content against the query.
   *
   * @param content - The content to match.
   * @returns The match result.
   */
  matchContent(content: string): unknown;

  /**
   * Matches a tag against the query.
   *
   * @param tag - The tag to match.
   * @returns The match result.
   */
  matchTag(tag: string): unknown;
}
