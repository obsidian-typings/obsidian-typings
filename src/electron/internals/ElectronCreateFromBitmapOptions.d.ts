/**
 * Options for `nativeImage.createFromBitmap`.
 *
 * @public
 * @unofficial
 */
export interface ElectronCreateFromBitmapOptions {
  /** The height of the bitmap, in pixels. */
  height: number;

  /**
   * The scale factor of the bitmap.
   *
   * @default `1`
   */
  scaleFactor?: number;

  /** The width of the bitmap, in pixels. */
  width: number;
}
