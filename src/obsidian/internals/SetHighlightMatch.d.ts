/**
 * Parameters for setting a highlight match in the editor.
 * @public
 * @unofficial
 */
export interface SetHighlightMatch {
  /** End character offset of the highlight. */
  endLoc?: number;

  /** Whether to focus the editor on the highlighted match. */
  focus: boolean;

  /** Line number of the highlight. */
  line?: number;

  /** The match data associated with this highlight. */
  match?: unknown;

  /** Start character offset of the highlight. */
  startLoc?: number;
}
