import type { LezerTree } from './LezerTree.d.ts';
import type { Parser } from './Parser.d.ts';

/**
 * Represents a tree mounted on a node via a node prop.
 *
 * @public
 * @unofficial
 */
export declare class MountedLezerTree {
  /** The regions of the host tree that this mounted tree covers, or `null` if it covers the entire node. */
  readonly overlay: null | readonly { from: number; to: number }[];

  /** The parser that produced this tree. */
  readonly parser: Parser;

  /** The mounted tree. */
  readonly tree: LezerTree;
}
