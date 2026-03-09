import type { BBox } from './BBox.d.ts';
import type { CanvasViewCanvasEdge } from './CanvasViewCanvasEdge.d.ts';

/**
 * Node in the spatial index (R-tree) for canvas edges.
 * @public
 * @unofficial
 */
export interface EdgeIndexData extends BBox {
  /** Child edges contained in this index node. */
  children: CanvasViewCanvasEdge[];

  /** Height of the subtree rooted at this node. */
  height: number;

  /** Whether this is a leaf node in the index. */
  leaf: boolean;
}
