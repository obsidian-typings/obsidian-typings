import type { LezerTree } from './LezerTree.d.ts';

/**
 * An in-progress parse operation that can be advanced incrementally.
 *
 * @public
 * @unofficial
 */
export interface PartialParse {
  /** The position up to which the document has been parsed. */
  readonly parsedPos: number;

  /** The position at which the parse was stopped, or `null` if not stopped. */
  readonly stoppedAt: null | number;

  /**
   * Advance the parse by some amount.
   *
   * @returns The finished tree, or `null` if more work is needed.
   */
  advance(): LezerTree | null;

  /**
   * Tell the parse to stop at a given position.
   *
   * @param pos - The position to stop at.
   */
  stopAt(pos: number): void;
}
