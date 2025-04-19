import type { CanvasViewDataEdge } from './CanvasViewDataEdge.d.ts';
import type { CanvasViewDataNode } from './CanvasViewDataNode.d.ts';

/** @public @unofficial */
export interface CanvasViewData {
    edges: CanvasViewDataEdge[];
    nodes: CanvasViewDataNode[];
}
