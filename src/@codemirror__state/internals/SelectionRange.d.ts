/**
 * A single selection range. When `anchor` and `head` are the same, it is a cursor selection;
 * when they differ, it is a range selection.
 *
 * @public
 * @unofficial
 */
export declare class SelectionRange {
  /** The anchor of the selection (the side that doesn't move when extending). */
  readonly anchor: number;

  /** The lower boundary of the range. */
  readonly from: number;

  /** The head of the selection (the side that moves when extending). */
  readonly head: number;

  /** The upper boundary of the range. */
  readonly to: number;

  /** Whether the range is empty (head and anchor are the same). */
  get empty(): boolean;
}
