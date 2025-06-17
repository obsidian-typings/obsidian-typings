import type { GraphColorAttributes } from './GraphColorAttributes.js';
import type { GraphNode } from './GraphNode.d.ts';

/**
 * Node data, used before the rendering process.
 *
 * @public
 * @unofficial
 */
export interface GraphNodeData {
    /** Color of the node if it is part of a group */
    color?: GraphColorAttributes;

    /** Record of forward neighbor nodes. */
    links: Record<string, boolean>;

    /** Type of the node, can be of value `"tag"`, `"unresolved"`, `"attachment"`, or an empty string for markdown nodes. */
    type: string;
}
