import type { CanvasViewDataEdge } from './CanvasViewDataEdge.d.ts';
import type { CanvasViewDataNode } from './CanvasViewDataNode.d.ts';

/**
 * @public
 * @unofficial
 */
export interface CanvasViewData {
    /**
     * @todo Documentation incomplete.
     */
    edges: CanvasViewDataEdge[];

    /**
     * @todo Documentation incomplete.
     */
    nodes: CanvasViewDataNode[];
}
