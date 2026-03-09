import type { EditorPosition } from 'obsidian';

/**
 * An extended editor range with nullable start and end positions.
 * @public
 * @unofficial
 */
export interface EditorRangeEx {
  /** Start position of the range, or null if unset. */
  from: EditorPosition | null;

  /** End position of the range, or null if unset. */
  to: EditorPosition | null;
}
