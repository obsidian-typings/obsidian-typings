/**
 * The currently rendered viewport range in a CodeMirror 5 editor.
 *
 * @public
 * @unofficial
 */
export interface Cm5Viewport {
  /** The start line of the viewport (inclusive). */
  from: number;
  /** The end line of the viewport (exclusive). */
  to: number;
}
