import type { CanvasViewCanvasNode } from './CanvasViewCanvasNode.d.ts';

/**
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasEdgeLink {
    end: string;
    node: CanvasViewCanvasNode;
    side: string;
}
