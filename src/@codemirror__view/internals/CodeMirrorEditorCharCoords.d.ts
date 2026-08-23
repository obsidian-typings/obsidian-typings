/**
 * The pixel coordinates of a character position.
 *
 * @remark Unlike a full bounding rectangle, no `right` edge is reported.
 *
 * @public
 * @unofficial
 */
export interface CodeMirrorEditorCharCoords {
  /** Bottom edge coordinate. */
  bottom: number;

  /** Left edge coordinate. */
  left: number;

  /** Top edge coordinate. */
  top: number;
}
