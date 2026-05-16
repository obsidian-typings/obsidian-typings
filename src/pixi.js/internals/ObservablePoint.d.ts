import type { IPointData } from './IPointData.d.ts';

/**
 * Observable point that triggers a callback when changed.
 *
 * @public
 * @unofficial
 */
export declare class ObservablePoint<T = unknown> implements IPointData {
  /** X coordinate. */
  x: number;

  /** Y coordinate. */
  y: number;

  /**
   * Copies x and y from the given point.
   *
   * @param p - The point to copy from.
   * @returns This point for chaining.
   */
  copyFrom(p: IPointData): this;

  /**
   * Copies x and y into the given point.
   *
   * @param p - The point to copy into.
   * @returns The target point.
   */
  copyTo<U extends IPointData>(p: U): U;

  /**
   * Sets the point to a new x and y position.
   *
   * @param x - Position on the X axis.
   * @param y - Position on the Y axis.
   * @returns This point for chaining.
   */
  set(x?: number, y?: number): this;
}
