import type { GraphNode } from './GraphNode.d.ts';

/**
 * Graph data.
 *
 * @public
 * @unofficial
 */
export interface GraphData {
    /** @todo Documentation incomplete. */
    nodes: Record<string, GraphNode>;

    /** @todo Documentation incomplete. */
    weights: Record<string, number>;
}
