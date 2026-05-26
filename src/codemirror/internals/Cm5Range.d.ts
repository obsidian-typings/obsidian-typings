import type { Position } from './Position.d.ts';

/**
 * A selection range in a CodeMirror 5 document.
 *
 * @public
 * @unofficial
 */
export interface Cm5Range {
  /** The fixed end of the selection. */
  anchor: Position;
  /** The moving end of the selection. */
  head: Position;

  /**
   * Returns `true` if the range is empty (anchor equals head).
   *
   * @returns Whether the range is empty.
   */
  empty(): boolean;

  /**
   * Returns the earlier of anchor and head.
   *
   * @returns The start position of the range.
   */
  from(): Position;

  /**
   * Returns the later of anchor and head.
   *
   * @returns The end position of the range.
   */
  to(): Position;
}
