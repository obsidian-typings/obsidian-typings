/**
 * Serialized data representation of an edge (connection) between two nodes in the canvas.
 *
 * @public
 * @unofficial
 */
export interface CanvasViewDataEdge {
  /** ID of the source node. */
  fromNode: string;

  /** Side of the source node where the edge originates (e.g., 'top', 'bottom', 'left', 'right'). */
  fromSide: string;

  /** Unique identifier for this edge. */
  id: string;

  /** ID of the target node. */
  toNode: string;

  /** Side of the target node where the edge terminates (e.g., 'top', 'bottom', 'left', 'right'). */
  toSide: string;
}
