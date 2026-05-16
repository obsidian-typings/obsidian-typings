/**
 * Rectangle object.
 *
 * @public
 * @unofficial
 */
export declare class PixiRectangle {
  /** Height of the rectangle. */
  height: number;

  /** Width of the rectangle. */
  width: number;

  /** X coordinate of the upper-left corner. */
  x: number;

  /** Y coordinate of the upper-left corner. */
  y: number;

  /**
   * Creates a new rectangle.
   *
   * @param x - X coordinate of the upper-left corner.
   * @param y - Y coordinate of the upper-left corner.
   * @param width - Width of the rectangle.
   * @param height - Height of the rectangle.
   */
  constructor(x?: number, y?: number, width?: number, height?: number);

  /** Bottom edge of the rectangle. */
  get bottom(): number;

  /**
   * Checks whether the given point is inside the rectangle.
   *
   * @param x - X coordinate to test.
   * @param y - Y coordinate to test.
   * @returns Whether the point is contained.
   */
  contains(x: number, y: number): boolean;

  /** An empty rectangle. */
  static get EMPTY(): PixiRectangle;

  /** Left edge of the rectangle. */
  get left(): number;

  /** Right edge of the rectangle. */
  get right(): number;

  /** Top edge of the rectangle. */
  get top(): number;
}
