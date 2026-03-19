/**
 * SVG path elements for rendering a canvas edge, with separate paths for display and interaction.
 *
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasEdgePath {
  /** SVG path element used for the visible edge rendering. */
  display: SVGPathElement;

  /** SVG path element used as a wider invisible hit area for interaction. */
  interaction: SVGPathElement;
}
