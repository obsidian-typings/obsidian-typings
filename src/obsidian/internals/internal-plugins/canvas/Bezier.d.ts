import type { Point } from 'obsidian';

/**
 * {@link Bezier} curve used for rendering canvas edge connections.
 *
 * @public
 * @unofficial
 */
export interface Bezier {
  /**
   * First control point of the {@link Bezier} curve.
   */
  cp1: Point;

  /**
   * Second control point of the {@link Bezier} curve.
   */
  cp2: Point;

  /**
   * Start point of the {@link Bezier} curve.
   */
  from: Point;

  /**
   * SVG path string representation of the {@link Bezier} curve.
   */
  path: string;

  /**
   * End point of the {@link Bezier} curve.
   */
  to: Point;
}
