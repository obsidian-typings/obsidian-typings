import type { ElectronNativeImageScaleFactorOptions } from './ElectronNativeImageScaleFactorOptions.d.ts';
import type { ElectronNativeImageSize } from './ElectronNativeImageSize.d.ts';

/**
 * Electron NativeImage for handling tray, dock, and application images.
 *
 * @public
 * @unofficial
 */
export interface ElectronNativeImage {
  /**
   * Returns the size of the image.
   *
   * @param scaleFactor - The scale factor to get the size for.
   * @returns The width and height of the image.
   */
  getSize(scaleFactor?: number): ElectronNativeImageSize;

  /**
   * Returns whether the image is empty.
   *
   * @returns Whether the image is empty.
   */
  isEmpty(): boolean;

  /**
   * Returns the image as a bitmap buffer.
   *
   * @param options - Options for the bitmap conversion including `scaleFactor`.
   * @returns The bitmap buffer.
   */
  toBitmap(options?: ElectronNativeImageScaleFactorOptions): Buffer;

  /**
   * Returns the image as a data URL string.
   *
   * @param options - Options for the conversion including `scaleFactor`.
   * @returns The data URL string.
   */
  toDataURL(options?: ElectronNativeImageScaleFactorOptions): string;

  /**
   * Returns the image as a JPEG buffer.
   *
   * @param quality - The JPEG quality (0-100).
   * @returns The JPEG buffer.
   */
  toJPEG(quality: number): Buffer;

  /**
   * Returns the image as a PNG buffer.
   *
   * @param options - Options for the PNG conversion including `scaleFactor`.
   * @returns The PNG buffer.
   */
  toPNG(options?: ElectronNativeImageScaleFactorOptions): Buffer;
}
