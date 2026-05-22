/**
 * Options for the scroll handler facet.
 *
 * @public
 * @unofficial
 */
export interface EditorViewScrollHandlerOptions {
  /** Horizontal alignment. */
  x: 'center' | 'end' | 'nearest' | 'start';
  /** Horizontal margin in pixels. */
  xMargin: number;
  /** Vertical alignment. */
  y: 'center' | 'end' | 'nearest' | 'start';
  /** Vertical margin in pixels. */
  yMargin: number;
}
