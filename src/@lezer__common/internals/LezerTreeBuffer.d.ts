import type { NodeSet } from './NodeSet.d.ts';

/**
 * A tree buffer represents a sequence of nodes in a compact flat array format.
 *
 * @public
 * @unofficial
 */
export declare class LezerTreeBuffer {
  /** The flat buffer of node data. */
  readonly buffer: Uint16Array;

  /** The total length of the content covered by this buffer. */
  readonly length: number;

  /** The node set that this buffer's node type ids refer to. */
  readonly set: NodeSet;
}
