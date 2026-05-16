import type { NodeProp } from './NodeProp.d.ts';

/**
 * Represents a type of syntax node in the tree.
 *
 * @public
 * @unofficial
 */
export declare class NodeType {
  /** The numeric id of this node type. */
  readonly id: number;

  /** The name of this node type. */
  readonly name: string;

  /** A dummy node type used when no actual type is available. */
  static none: NodeType;

  /**
   * Retrieve the value of a given node prop for this type.
   *
   * @param prop - The property to look up.
   * @returns The property value, or `undefined` if not set.
   */
  readonly prop: <T>(prop: NodeProp<T>) => T | undefined;
}
