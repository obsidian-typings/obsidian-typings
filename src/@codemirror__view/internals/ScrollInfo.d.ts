/**
 * Information about the editor's scroll position and dimensions.
 * @public
 * @unofficial
 */
export interface ScrollInfo {
  /** Visible height of the scrollable area (viewport height). */
  clientHeight: number;

  /** Visible width of the scrollable area (viewport width). */
  clientWidth: number;

  /** Total scrollable height of the content. */
  height: number;

  /** Horizontal scroll offset. */
  left: number;

  /** Vertical scroll offset. */
  top: number;

  /** Total scrollable width of the content. */
  width: number;
}
