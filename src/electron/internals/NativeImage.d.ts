/**
 * Electron NativeImage for handling tray, dock, and application images.
 *
 * @public
 * @unofficial
 */
export interface NativeImage {
  /**
   * Returns the size of the image.
   *
   * @param scaleFactor - The scale factor to get the size for.
   * @returns The width and height of the image.
   */
  getSize(scaleFactor?: number): { width: number; height: number };

  /**
   * Returns whether the image is empty.
   *
   * @returns Whether the image is empty.
   */
  isEmpty(): boolean;

  /* eslint-disable jsdoc/check-param-names -- TSDoc does not support dot-notation sub-params. */
  /**
   * Returns the image as a bitmap buffer.
   *
   * @param options - Options for the bitmap conversion including `scaleFactor`.
   * @returns The bitmap buffer.
   */
  toBitmap(options?: { scaleFactor?: number }): Buffer;

  /**
   * Returns the image as a data URL string.
   *
   * @param options - Options for the conversion including `scaleFactor`.
   * @returns The data URL string.
   */
  toDataURL(options?: { scaleFactor?: number }): string;
  /* eslint-enable jsdoc/check-param-names -- Re-enable after inline object param. */

  /**
   * Returns the image as a JPEG buffer.
   *
   * @param quality - The JPEG quality (0-100).
   * @returns The JPEG buffer.
   */
  toJPEG(quality: number): Buffer;

  /* eslint-disable jsdoc/check-param-names -- TSDoc does not support dot-notation sub-params. */
  /**
   * Returns the image as a PNG buffer.
   *
   * @param options - Options for the PNG conversion including `scaleFactor`.
   * @returns The PNG buffer.
   */
  toPNG(options?: { scaleFactor?: number }): Buffer;
  /* eslint-enable jsdoc/check-param-names -- Re-enable after inline object param. */
}
