/**
 * Options for creating a text marker in CodeMirror 5.
 *
 * @public
 * @unofficial
 */
export interface Cm5TextMarkerOptions {
  /** When set to `true`, adding this marker will create an event in the undo history. */
  addToHistory?: boolean;
  /** Atomic ranges act as a single unit when cursor movement is concerned. */
  atomic?: boolean;
  /** When given, add the attributes to the elements created for the marked text. */
  attributes?: Record<string, string>;
  /** Assigns a CSS class to the marked stretch of text. */
  className?: string;
  /** When enabled, will cause the mark to clear itself whenever the cursor enters its range. */
  clearOnEnter?: boolean;
  /** Determines whether the mark is automatically cleared when it becomes empty. */
  clearWhenEmpty?: boolean;
  /** Collapsed ranges do not show up in the display. */
  collapsed?: boolean;
  /** A string of CSS to be applied to the covered text. */
  css?: string;
  /** Equivalent to startStyle, but for the rightmost span. */
  endStyle?: string;
  /** Whether the editor will capture mouse and drag events occurring in this widget. */
  handleMouseEvents?: boolean;
  /** Determines whether text inserted on the left of the marker will end up inside or outside of it. */
  inclusiveLeft?: boolean;
  /** Like inclusiveLeft, but for the right side. */
  inclusiveRight?: boolean;
  /** A read-only span cannot be modified except by calling setValue. */
  readOnly?: boolean;
  /** Use a given node to display this range. Implies both collapsed and atomic. */
  replacedWith?: HTMLElement;
  /** For atomic ranges, determines whether the cursor is allowed to be placed directly to the left. */
  selectLeft?: boolean;
  /** Like selectLeft, but for the right side. */
  selectRight?: boolean;
  /** When set to `true`, makes the marker appear in all linked documents. */
  shared?: boolean;
  /** Can be used to specify an extra CSS class for the leftmost span of the marker. */
  startStyle?: string;
  /** When given, will give the nodes a HTML title attribute with the given value. */
  title?: string;
}
