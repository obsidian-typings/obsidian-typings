/**
 * Parameters for computing a page viewport.
 *
 * @public
 * @unofficial
 */
export interface GetViewportParams {
  /** Whether to flip the viewport. */
  dontFlip?: boolean;
  /** Horizontal offset. */
  offsetX?: number;
  /** Vertical offset. */
  offsetY?: number;
  /** Rotation angle in degrees. */
  rotation?: number;
  /** Scale factor. */
  scale: number;
}
