import type { Position } from './Position.d.ts';

/**
 * A selection range input for CodeMirror 5 selection operations.
 *
 * @public
 * @unofficial
 */
export interface Cm5SelectionRange {
  /** The fixed end of the selection. */
  anchor: Position;
  /** The moving end of the selection. */
  head: Position;
}
