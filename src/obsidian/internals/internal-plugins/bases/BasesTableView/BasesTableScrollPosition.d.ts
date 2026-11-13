/**
 * The scroll position of a {@link BasesTableView}, as fractions of the size of the table's content rather than in
 * pixels, so that it survives a change in the content's size: `0` is scrolled to the start.
 *
 * @public
 * @unofficial
 */
export interface BasesTableScrollPosition {
  /** The horizontal scroll offset, as a fraction of the table's content width. */
  left: number;

  /** The vertical scroll offset, as a fraction of the table's content height. */
  top: number;
}
