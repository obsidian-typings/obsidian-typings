import type { NodeType } from './NodeType.d.ts';

/**
 * A set of node types, used to define the types available in a grammar.
 *
 * @public
 * @unofficial
 */
export declare class NodeSet {
  /** The node types in this set, indexed by their id. */
  readonly types: readonly NodeType[];
}
