import type { SearchRegexMatcher } from './SearchRegexMatcher.d.ts';

/**
 * An unquoted literal substring matcher.
 *
 * @public
 * @unofficial
 */
export interface SearchTextMatcher extends SearchRegexMatcher {
  /** The literal substring. */
  text: string;

  /**
   * Replaces the text and its escaped regular expression source.
   *
   * @param text - The replacement literal.
   */
  setText(text: string): void;
}
