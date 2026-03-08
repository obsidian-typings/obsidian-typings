import type { CanvasViewCanvasNode } from './CanvasViewCanvasNode.d.ts';

/**
 * Represents one endpoint of a canvas edge, linking it to a specific side of a node.
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasEdgeLink {
    /** Which end of the edge this link represents ('from' or 'to'). */
    end: string;

    /** The node this edge endpoint is connected to. */
    node: CanvasViewCanvasNode;

    /** The side of the node where this edge connects (e.g., 'top', 'bottom', 'left', 'right'). */
    side: string;
}
