import type { ColorSource } from './ColorSource.d.ts';
import type { Container } from './Container.d.ts';
import type { GraphicsGeometry } from './GraphicsGeometry.d.ts';
import type { IDestroyOptions } from './IDestroyOptions.d.ts';

/**
 * Graphics class for drawing shapes.
 *
 * @public
 * @unofficial
 */
export declare class Graphics extends Container {
  /**
   * Creates a new graphics object.
   *
   * @param geometry - The geometry to use.
   */
  constructor(geometry?: GraphicsGeometry);

  /**
   * Draws an arc.
   *
   * @param cx - Center X.
   * @param cy - Center Y.
   * @param radius - Arc radius.
   * @param startAngle - Start angle in radians.
   * @param endAngle - End angle in radians.
   * @param anticlockwise - Whether to draw anticlockwise.
   * @returns This graphics for chaining.
   */
  arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this;

  /**
   * Draws an arc between two tangent lines.
   *
   * @param x1 - First point X.
   * @param y1 - First point Y.
   * @param x2 - Second point X.
   * @param y2 - Second point Y.
   * @param radius - Arc radius.
   * @returns This graphics for chaining.
   */
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this;

  /**
   * Begins filling a shape with color.
   *
   * @param color - Fill color.
   * @param alpha - Fill alpha.
   * @returns This graphics for chaining.
   */
  beginFill(color?: ColorSource, alpha?: number): this;

  /**
   * Draws a cubic bezier curve.
   *
   * @param cpX - First control point X.
   * @param cpY - First control point Y.
   * @param cpX2 - Second control point X.
   * @param cpY2 - Second control point Y.
   * @param toX - End point X.
   * @param toY - End point Y.
   * @returns This graphics for chaining.
   */
  bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): this;

  /** Clears all drawn graphics. */
  clear(): this;

  /** Clones this graphics object. */
  clone(): Graphics;

  /** Closes the current path. */
  closePath(): this;

  /**
   * Destroys this graphics object.
   *
   * @param options - Destroy options.
   */
  destroy(options?: boolean | IDestroyOptions): void;

  /**
   * Draws a circle.
   *
   * @param x - Center X.
   * @param y - Center Y.
   * @param radius - Circle radius.
   * @returns This graphics for chaining.
   */
  drawCircle(x: number, y: number, radius: number): this;

  /**
   * Draws an ellipse.
   *
   * @param x - Center X.
   * @param y - Center Y.
   * @param width - Half width.
   * @param height - Half height.
   * @returns This graphics for chaining.
   */
  drawEllipse(x: number, y: number, width: number, height: number): this;

  /**
   * Draws a rectangle.
   *
   * @param x - X position.
   * @param y - Y position.
   * @param width - Width.
   * @param height - Height.
   * @returns This graphics for chaining.
   */
  drawRect(x: number, y: number, width: number, height: number): this;

  /**
   * Draws a rounded rectangle.
   *
   * @param x - X position.
   * @param y - Y position.
   * @param width - Width.
   * @param height - Height.
   * @param radius - Corner radius.
   * @returns This graphics for chaining.
   */
  drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): this;

  /** Ends filling a shape. */
  endFill(): this;

  /**
   * Sets the line style.
   *
   * @param width - Line width.
   * @param color - Line color.
   * @param alpha - Line alpha.
   * @param alignment - Line alignment.
   * @param native - Whether to use native line drawing.
   * @returns This graphics for chaining.
   */
  lineStyle(width: number, color?: ColorSource, alpha?: number, alignment?: number, native?: boolean): this;

  /**
   * Draws a line to a point.
   *
   * @param x - X coordinate.
   * @param y - Y coordinate.
   * @returns This graphics for chaining.
   */
  lineTo(x: number, y: number): this;

  /**
   * Moves the drawing cursor to a point.
   *
   * @param x - X coordinate.
   * @param y - Y coordinate.
   * @returns This graphics for chaining.
   */
  moveTo(x: number, y: number): this;

  /**
   * Draws a quadratic bezier curve.
   *
   * @param cpX - Control point X.
   * @param cpY - Control point Y.
   * @param toX - End point X.
   * @param toY - End point Y.
   * @returns This graphics for chaining.
   */
  quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): this;

  /** Tint color. */
  get tint(): ColorSource;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set tint(value: ColorSource);
}
