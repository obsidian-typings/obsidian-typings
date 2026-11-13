import type { LezerTree } from './LezerTree.d.ts';

/**
 * Represents a fragment of a previously parsed tree that can be reused.
 *
 * @public
 * @unofficial
 */
export declare class LezerTreeFragment {
  /** The start position of this fragment in the original document. */
  readonly from: number;

  /** The offset that positions in this fragment are shifted by. */
  readonly offset: number;

  /** The end position of this fragment in the original document. */
  readonly to: number;

  /** The tree for this fragment. */
  readonly tree: LezerTree;
}
