/**
 * Hit area interface.
 *
 * @public
 * @unofficial
 */
export interface IHitArea {
  /**
   * Checks whether the point is inside the hit area.
   *
   * @param x - X coordinate.
   * @param y - Y coordinate.
   * @returns Whether the point is contained.
   */
  contains(x: number, y: number): boolean;
}
