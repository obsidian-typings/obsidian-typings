import type { CanvasViewDataEdge } from './CanvasViewDataEdge.d.ts';
import type { CanvasViewDataNode } from './CanvasViewDataNode.d.ts';

/** @public */
export interface CanvasViewData {
    edges: CanvasViewDataEdge[];
    nodes: CanvasViewDataNode[];
}
