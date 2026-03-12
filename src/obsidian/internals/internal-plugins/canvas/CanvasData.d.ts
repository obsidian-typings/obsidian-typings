import type { CanvasViewDataEdge } from './CanvasViewDataEdge.d.ts';
import type { CanvasViewDataNode } from './CanvasViewDataNode.d.ts';

/**
 * Serialized canvas data containing all nodes and edges.
 *
 * @public
 * @unofficial
 */
export interface CanvasViewData {
  /** Array of serialized edge data for all connections in the canvas. */
  edges: CanvasViewDataEdge[];

  /** Array of serialized node data for all nodes in the canvas. */
  nodes: CanvasViewDataNode[];
}
