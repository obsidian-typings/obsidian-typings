import type { Position } from './Position.d.ts';

/**
 * A position range with from and to in CodeMirror 5.
 *
 * @public
 * @unofficial
 */
export interface Cm5PositionRange {
  /** The start position. */
  from: Position;
  /** The end position. */
  to: Position;
}
