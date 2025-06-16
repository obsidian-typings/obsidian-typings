import type { GraphNodeData } from './GraphNodeData.js';

/**
 * Data selected to be rendered in the graph based on the current options.
 *
 * @public
 * @unofficial
 */
export interface GraphData {
    /** Record of nodes selected to be rendered. Their IDs are used as keys. */
    nodes: Record<string, GraphNodeData>;

    /** Number of links. */
    numLinks: number;
}
