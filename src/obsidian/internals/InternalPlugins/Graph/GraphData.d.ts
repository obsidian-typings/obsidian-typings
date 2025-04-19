import type { GraphNode } from './GraphNode.d.ts';

/**
 * Graph data.
 *
 * @public @unofficial
 */
export interface GraphData {
    nodes: Record<string, GraphNode>;
    weights: Record<string, number>;
}
