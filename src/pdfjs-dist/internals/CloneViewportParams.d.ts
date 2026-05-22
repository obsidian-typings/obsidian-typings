/**
 * Parameters for cloning a page viewport with overrides.
 *
 * @public
 * @unofficial
 */
export interface CloneViewportParams {
  /** Whether to flip the viewport. */
  dontFlip?: boolean;
  /** Horizontal offset. */
  offsetX?: number;
  /** Vertical offset. */
  offsetY?: number;
  /** Rotation angle in degrees. */
  rotation?: number;
  /** Scale factor. */
  scale?: number;
}
