import type { LezerTree } from './LezerTree.d.ts';
import type { NodeType } from './NodeType.d.ts';
import type { SyntaxNode } from './SyntaxNode.d.ts';

/**
 * A reference to a syntax node, providing its position and type information.
 *
 * @public
 * @unofficial
 */
export interface SyntaxNodeRef {
  /** The start position of the node. */
  readonly from: number;

  /** The name of the node type. */
  readonly name: string;

  /** The actual syntax node. */
  readonly node: SyntaxNode;

  /** The end position of the node. */
  readonly to: number;

  /** The tree that this node belongs to, if it is a top node. */
  readonly tree: LezerTree | null;

  /** The type of this node. */
  readonly type: NodeType;
}
