import type { Cm5Range } from './Cm5Range.d.ts';

/**
 * A selection change event object in CodeMirror 5.
 *
 * @public
 * @unofficial
 */
export interface Cm5EditorSelectionChange {
  /** The origin of the selection change. */
  origin?: string;
  /** The new selection ranges. */
  ranges: Cm5Range[];

  /**
   * Modifies the ranges for this selection change.
   *
   * @param ranges - The new selection ranges.
   */
  update(ranges: Cm5Range[]): void;
}
