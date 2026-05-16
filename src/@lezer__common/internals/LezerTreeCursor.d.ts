import type { LezerTree } from './LezerTree.d.ts';
import type { NodeType } from './NodeType.d.ts';
import type { SyntaxNode } from './SyntaxNode.d.ts';
import type { SyntaxNodeRef } from './SyntaxNodeRef.d.ts';

/**
 * A cursor for walking through the syntax tree.
 *
 * @public
 * @unofficial
 */
export declare class LezerTreeCursor implements SyntaxNodeRef {
  /** The start position of the current node. */
  readonly from: number;

  /** The name of the current node type. */
  readonly name: string;

  /** The actual syntax node at the current position. */
  readonly node: SyntaxNode;

  /** The end position of the current node. */
  readonly to: number;

  /** The tree that the current node belongs to, if it is a top node. */
  readonly tree: LezerTree | null;

  /** The type of the current node. */
  readonly type: NodeType;

  /**
   * Move to the first child of the current node.
   *
   * @returns Whether a child was found.
   */
  firstChild(): boolean;

  /**
   * Move to the last child of the current node.
   *
   * @returns Whether a child was found.
   */
  lastChild(): boolean;

  /**
   * Move to the next node in tree order.
   *
   * @param enter - Whether to enter child nodes.
   * @returns Whether a next node was found.
   */
  next(enter?: boolean): boolean;

  /**
   * Move to the next sibling of the current node.
   *
   * @returns Whether a sibling was found.
   */
  nextSibling(): boolean;

  /**
   * Move to the parent of the current node.
   *
   * @returns Whether a parent was found.
   */
  parent(): boolean;

  /**
   * Move to the previous node in tree order.
   *
   * @param enter - Whether to enter child nodes.
   * @returns Whether a previous node was found.
   */
  prev(enter?: boolean): boolean;

  /**
   * Move to the previous sibling of the current node.
   *
   * @returns Whether a sibling was found.
   */
  prevSibling(): boolean;
}
