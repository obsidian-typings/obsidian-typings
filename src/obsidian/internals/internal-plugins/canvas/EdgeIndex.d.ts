import type { EdgeIndexBase } from './EdgeIndexBase.d.ts';
import type { EdgeIndexData } from './EdgeIndexData.d.ts';

/**
 * Spatial index (R-tree) for efficient hit-testing and spatial queries on canvas edges and nodes.
 * @public
 * @unofficial
 */
export interface EdgeIndex extends EdgeIndexBase {
  /** Maximum number of entries per R-tree node before splitting. */
  _maxEntries: number;

  /** Minimum number of entries per R-tree node before merging. */
  _minEntries: number;

  /** Root data node of the R-tree. */
  data: EdgeIndexData;

  /**
   * Compare two items by their minimum X coordinate for sorting.
   *
   * @returns The comparison result.
   */
  compareMinX(arg1: unknown, arg2: unknown): unknown;

  /**
   * Compare two items by their minimum Y coordinate for sorting.
   *
   * @returns The comparison result.
   */
  compareMinY(arg1: unknown, arg2: unknown): unknown;
}
