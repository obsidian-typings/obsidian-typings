import type { IterMode } from './IterMode.d.ts';
import type { LezerTree } from './LezerTree.d.ts';
import type { LezerTreeCursor } from './LezerTreeCursor.d.ts';
import type { NodeType } from './NodeType.d.ts';

/**
 * Represents a node in the syntax tree.
 *
 * @public
 * @unofficial
 */
export interface SyntaxNode {
  /** The first child node. */
  firstChild: null | SyntaxNode;

  /** The start position of this node. */
  from: number;

  /** The last child node. */
  lastChild: null | SyntaxNode;

  /** The name of the node type. */
  name: string;

  /** The next sibling node. */
  nextSibling: null | SyntaxNode;

  /** The parent node. */
  parent: null | SyntaxNode;

  /** The previous sibling node. */
  prevSibling: null | SyntaxNode;

  /** The end position of this node. */
  to: number;

  /** The tree that this node belongs to, if it is a top node. */
  tree: LezerTree | null;

  /** The type of this node. */
  type: NodeType;

  /**
   * Create a tree cursor starting at this node.
   *
   * @param mode - The iteration mode.
   * @returns A tree cursor.
   */
  cursor(mode?: IterMode): LezerTreeCursor;

  /**
   * Resolve the node at the given position.
   *
   * @param pos - The position to resolve.
   * @param side - Which side of the position to prefer.
   * @returns The resolved syntax node.
   */
  resolve(pos: number, side?: -1 | 0 | 1): SyntaxNode;
}
