/**
 * Options for `nativeImage.createFromBuffer`.
 *
 * @public
 * @unofficial
 */
export interface ElectronCreateFromBufferOptions {
  /** Required for bitmap buffers. The height of the image, in pixels. */
  height?: number;

  /**
   * The scale factor of the image.
   *
   * @default `1`
   */
  scaleFactor?: number;

  /** Required for bitmap buffers. The width of the image, in pixels. */
  width?: number;
}
