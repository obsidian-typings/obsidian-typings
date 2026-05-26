/**
 * Options for creating a line widget in CodeMirror 5.
 *
 * @public
 * @unofficial
 */
export interface Cm5LineWidgetOptions {
  /** Causes the widget to be placed above instead of below the text of the line. */
  above?: boolean;
  /** Add an extra CSS class name to the wrapper element. */
  className?: string;
  /** Whether the widget should cover the gutter. */
  coverGutter?: boolean;
  /** Whether the editor will capture mouse and drag events occurring in this widget. */
  handleMouseEvents?: boolean;
  /** Position at which to insert the widget (zero for top, N for after Nth widget). */
  insertAt?: number;
  /** Whether the widget should stay fixed in the face of horizontal scrolling. */
  noHScroll?: boolean;
  /** When `true`, will cause the widget to be rendered even if the line is hidden. */
  showIfHidden?: boolean;
}
