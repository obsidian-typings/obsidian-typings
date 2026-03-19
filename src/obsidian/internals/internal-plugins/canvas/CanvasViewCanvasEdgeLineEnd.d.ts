/**
 * Represents the visual endpoint (arrow, dot, etc.) at one end of a canvas edge.
 *
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasEdgeLineEnd {
  /** SVG group element containing the line end marker. */
  el: SVGGElement;

  /** Type of the line end marker (e.g., 'arrow', 'none'). */
  type: string;
}
