import type { EditorPosition } from 'obsidian';

/**
 * Result of a matching bracket search.
 * @public
 * @unofficial
 */
export interface MatchingBracket {
  /** Position of the matching bracket, if found. */
  to?: EditorPosition;
}
