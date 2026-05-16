import type { SelectionRange } from './SelectionRange.d.ts';

/**
 * An editor selection holds one or more selection ranges.
 *
 * @public
 * @unofficial
 */
export declare class CmEditorSelection {
  /** The index of the main selection range. */
  readonly mainIndex: number;

  /** The ranges in this selection. */
  readonly ranges: readonly SelectionRange[];

  /**
   * Create a selection from an array of ranges.
   *
   * @param ranges - The selection ranges.
   * @param mainIndex - The index of the main range.
   * @returns The created selection.
   */
  static create(ranges: readonly SelectionRange[], mainIndex?: number): CmEditorSelection;

  /**
   * Create a cursor selection range.
   *
   * @param pos - The cursor position.
   * @param assoc - The side to associate with.
   * @returns The cursor selection range.
   */
  static cursor(pos: number, assoc?: number): SelectionRange;

  /** The main selection range. */
  get main(): SelectionRange;

  /**
   * Create a selection with a single range.
   *
   * @param anchor - The anchor position.
   * @param head - The head position.
   * @returns The created selection.
   */
  static single(anchor: number, head?: number): CmEditorSelection;
}
