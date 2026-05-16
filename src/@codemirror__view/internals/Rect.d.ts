/**
 * A rectangle representing a position in the document layout.
 *
 * @public
 * @unofficial
 */
export interface Rect {
  /** The bottom edge of the rectangle. */
  readonly bottom: number;

  /** The left edge of the rectangle. */
  readonly left: number;

  /** The right edge of the rectangle. */
  readonly right: number;

  /** The top edge of the rectangle. */
  readonly top: number;
}
