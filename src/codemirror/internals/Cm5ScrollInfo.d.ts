/**
 * Scroll position information for a CodeMirror 5 editor.
 *
 * @public
 * @unofficial
 */
export interface Cm5ScrollInfo {
  /** The visible area height (minus scrollbars). */
  clientHeight: number;
  /** The visible area width (minus scrollbars). */
  clientWidth: number;
  /** Total scrollable height. */
  height: number;
  /** Current horizontal scroll position. */
  left: number;
  /** Current vertical scroll position. */
  top: number;
  /** Total scrollable width. */
  width: number;
}
