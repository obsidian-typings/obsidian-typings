/**
 * A selection specified as an anchor position and optional head position.
 *
 * @public
 * @unofficial
 */
export interface EditorStateSelectionSpec {
  /**
   * The anchor position of the selection.
   */
  anchor: number;
  /** The head position of the selection. */
  head?: number;
}
