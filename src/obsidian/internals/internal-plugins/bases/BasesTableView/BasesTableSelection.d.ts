/**
 * A rectangular cell selection in a {@link BasesTableView}, bounded by rows and columns within one group.
 *
 * @public
 * @unofficial
 */
export interface BasesTableSelection {
  /** The index of the last selected row. */
  bottom: number;

  /** The index of the last selected column. */
  end: number;

  /** The index of the group the selection is in. */
  groupIdx: number;

  /** The index of the first selected column. */
  start: number;

  /** The index of the first selected row. */
  top: number;
}
