/**
 * Options for creating a bookmark in CodeMirror 5.
 *
 * @public
 * @unofficial
 */
export interface Cm5BookmarkOptions {
  /** Whether CodeMirror handles mouse events on the bookmark widget. */
  handleMouseEvents?: boolean;
  /** Whether text typed at the bookmark position goes to the left of it. */
  insertLeft?: boolean;
  /** Whether the bookmark appears in all linked documents. */
  shared?: boolean;
  /** A DOM node to display at the bookmark position. */
  widget?: HTMLElement;
}
