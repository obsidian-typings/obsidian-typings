import type { CloneViewportParams } from './CloneViewportParams.d.ts';

/**
 * Represents a viewport for a PDF page.
 *
 * @public
 * @unofficial
 */
export interface PageViewport {
  /** Height of the viewport. */
  height: number;
  /** Horizontal offset. */
  offsetX: number;
  /** Vertical offset. */
  offsetY: number;
  /** Rotation angle in degrees. */
  rotation: number;
  /** Scale factor. */
  scale: number;
  /** Transformation matrix. */
  transform: number[];
  /** The view box coordinates. */
  viewBox: number[];
  /** Width of the viewport. */
  width: number;

  /**
   * Clones the viewport with optional parameter overrides.
   *
   * @param params - Optional parameters to override including `scale`, `rotation`, `offsetX`, `offsetY`, and `dontFlip`.
   * @returns A new PageViewport instance.
   */
  clone(params?: CloneViewportParams): PageViewport;

  /**
   * Converts viewport coordinates to PDF coordinates.
   *
   * @param x - The x coordinate in viewport space.
   * @param y - The y coordinate in viewport space.
   * @returns The PDF coordinates as a tuple.
   */
  convertToPdfPoint(x: number, y: number): [number, number];

  /**
   * Converts PDF coordinates to viewport coordinates.
   *
   * @param x - The x coordinate in PDF space.
   * @param y - The y coordinate in PDF space.
   * @returns The viewport coordinates as a tuple.
   */
  convertToViewportPoint(x: number, y: number): [number, number];
}
