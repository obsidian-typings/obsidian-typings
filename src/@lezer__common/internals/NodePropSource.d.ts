import type { NodeProp } from './NodeProp.d.ts';
import type { NodeType } from './NodeType.d.ts';

/**
 * A function that computes a node prop value for a given node type.
 *
 * @public
 * @unofficial
 */
export interface NodePropSource {
  (type: NodeType): [NodeProp<unknown>, unknown] | undefined;
}
