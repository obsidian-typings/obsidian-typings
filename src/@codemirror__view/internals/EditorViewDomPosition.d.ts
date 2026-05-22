/**
 * A DOM position with a node and offset.
 *
 * @public
 * @unofficial
 */
export interface EditorViewDomPosition {
  /** The DOM node. */
  node: Node;
  /** The offset within the node. */
  offset: number;
}
