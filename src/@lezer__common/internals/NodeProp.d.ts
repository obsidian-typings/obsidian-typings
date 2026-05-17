import type { MountedLezerTree } from './MountedLezerTree.d.ts';
import type { NodePropSource } from './NodePropSource.d.ts';
import type { NodeType } from './NodeType.d.ts';

/**
 * A node prop is a value associated with node types.
 *
 * @public
 * @unofficial
 */
export declare class NodeProp<T> {
  /** Prop for closed bracket names. */
  static closedBy: NodeProp<readonly string[]>;

  /** Context hash prop, used to distinguish nodes that would otherwise look the same. */
  static contextHash: NodeProp<number>;

  /** A function to deserialize prop values from strings. */
  readonly deserialize: (str: string) => T;

  /** Prop for node grouping. */
  static group: NodeProp<readonly string[]>;

  /** Look-ahead prop, indicating how far the tokenizer looked ahead. */
  static lookAhead: NodeProp<number>;

  /** Prop used to mount additional trees on a node. */
  static mounted: NodeProp<MountedLezerTree>;

  /** Prop for open bracket names. */
  static openedBy: NodeProp<readonly string[]>;

  /** Whether this prop is stored per node rather than per type. */
  readonly perNode: boolean;

  /**
   * Create a new node prop.
   *
   * @param config - Configuration for the prop.
   */
  constructor(config?: {
    deserialize?(str: string): T;
    perNode?: boolean;
  });

  /**
   * Create a prop source that adds this prop to matching node types.
   *
   * @param match - A mapping from selectors to values, or a function computing values.
   * @returns A prop source.
   */
  add(match: ((type: NodeType) => T | undefined) | { [selector: string]: T }): NodePropSource;
}
