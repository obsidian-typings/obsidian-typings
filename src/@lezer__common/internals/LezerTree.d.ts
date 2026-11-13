import type { IterMode } from './IterMode.d.ts';
import type { LezerTreeBuffer } from './LezerTreeBuffer.d.ts';
import type { LezerTreeCursor } from './LezerTreeCursor.d.ts';
import type { NodeProp } from './NodeProp.d.ts';
import type { NodeType } from './NodeType.d.ts';
import type { SyntaxNode } from './SyntaxNode.d.ts';

/**
 * A parse tree representing the syntactic structure of a document.
 *
 * @public
 * @unofficial
 */
export declare class LezerTree {
  /** The child trees and buffers of this node. */
  readonly children: readonly (LezerTree | LezerTreeBuffer)[];

  /** An empty tree. */
  static empty: LezerTree;

  /** The total length of the content covered by this tree. */
  readonly length: number;

  /** The start positions of the children. */
  readonly positions: readonly number[];

  /** The type of the top node. */
  readonly type: NodeType;

  /**
   * Create a new tree node.
   *
   * @param type - The node type.
   * @param children - The child trees and buffers.
   * @param positions - The start positions of the children.
   * @param length - The total length of content covered.
   * @param props - Optional node properties.
   */
  constructor(
    type: NodeType,
    children: readonly (LezerTree | LezerTreeBuffer)[],
    positions: readonly number[],
    length: number,
    props?: readonly [NodeProp<unknown> | number, unknown][]
  );

  /**
   * Create a cursor over this tree.
   *
   * @param mode - The iteration mode.
   * @returns A tree cursor.
   */
  cursor(mode?: IterMode): LezerTreeCursor;

  /**
   * Create a cursor positioned at the given position.
   *
   * @param pos - The position to start at.
   * @param side - Which side of the position to prefer.
   * @param mode - The iteration mode.
   * @returns A tree cursor.
   */
  cursorAt(pos: number, side?: -1 | 0 | 1, mode?: IterMode): LezerTreeCursor;

  /**
   * Get the value of a prop for the top node type.
   *
   * @param prop - The property to look up.
   * @returns The property value, or `undefined` if not set.
   */
  prop<T>(prop: NodeProp<T>): T | undefined;

  /**
   * Resolve the node at the given position.
   *
   * @param pos - The position to resolve.
   * @param side - Which side of the position to prefer.
   * @returns The resolved syntax node.
   */
  resolve(pos: number, side?: -1 | 0 | 1): SyntaxNode;

  /**
   * Resolve the innermost node at the given position.
   *
   * @param pos - The position to resolve.
   * @param side - Which side of the position to prefer.
   * @returns The resolved syntax node.
   */
  resolveInner(pos: number, side?: -1 | 0 | 1): SyntaxNode;

  /** The top node of this tree. */
  get topNode(): SyntaxNode;
}
