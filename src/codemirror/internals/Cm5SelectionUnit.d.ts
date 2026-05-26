import type { Cm5Editor } from './Cm5Editor.d.ts';
import type { Cm5PositionRange } from './Cm5PositionRange.d.ts';
import type { Position } from './Position.d.ts';

/**
 * A custom selection unit function for CodeMirror 5 mouse selection.
 *
 * @public
 * @unofficial
 */
export interface Cm5SelectionUnit {
  (cm: Cm5Editor, pos: Position): Cm5PositionRange;
}
