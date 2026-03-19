/**
 * Axis-aligned bounding box.
 *
 * @public
 * @unofficial
 */
export interface BBox {
  /** Maximum x coordinate (right edge). */
  maxX: number;

  /** Maximum y coordinate (bottom edge). */
  maxY: number;

  /** Minimum x coordinate (left edge). */
  minX: number;

  /** Minimum y coordinate (top edge). */
  minY: number;
}
