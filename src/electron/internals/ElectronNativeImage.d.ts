import type { ElectronAddRepresentationOptions } from './ElectronAddRepresentationOptions.d.ts';
import type { ElectronNativeImageScaleFactorOptions } from './ElectronNativeImageScaleFactorOptions.d.ts';
import type { ElectronNativeImageSize } from './ElectronNativeImageSize.d.ts';
import type { ElectronRectangle } from './ElectronRectangle.d.ts';
import type { ElectronResizeOptions } from './ElectronResizeOptions.d.ts';

/**
 * Electron NativeImage for handling tray, dock, and application images.
 *
 * @public
 * @unofficial
 */
export interface ElectronNativeImage {
  /**
   * A `boolean` property that determines whether the image is considered a template image. Only has an effect on macOS.
   */
  isMacTemplateImage: boolean;

  /**
   * Adds an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.
   *
   * @param options - The image representation to add, including `scaleFactor` and either a `buffer` or `dataURL`.
   */
  addRepresentation(options: ElectronAddRepresentationOptions): void;

  /**
   * Returns a cropped copy of the image.
   *
   * @param rect - The area of the image to crop.
   * @returns The cropped image.
   */
  crop(rect: ElectronRectangle): ElectronNativeImage;

  /**
   * Returns the image's aspect ratio. If `scaleFactor` is passed, this returns the aspect ratio corresponding to the image representation most closely matching the passed value.
   *
   * @param scaleFactor - The scale factor to get the aspect ratio for.
   * @returns The image's aspect ratio.
   */
  getAspectRatio(scaleFactor?: number): number;

  /**
   * Returns a buffer that contains the image's raw bitmap pixel data. The difference between `getBitmap()` and `toBitmap()` is that `getBitmap()` does not copy the bitmap data, so the returned buffer must be used immediately in the current event loop tick; otherwise the data might be changed or destroyed.
   *
   * @param options - Options for the bitmap conversion including `scaleFactor`.
   * @returns The image's raw bitmap pixel data.
   */
  getBitmap(options?: ElectronNativeImageScaleFactorOptions): Buffer;

  /**
   * Returns a buffer that stores the C pointer to the underlying native handle of the image. On macOS, a pointer to an `NSImage` instance is returned. The returned pointer is a weak pointer to the underlying native image, so the associated `nativeImage` instance must be kept around. Only available on macOS.
   *
   * @returns The native handle of the image.
   */
  getNativeHandle(): Buffer;

  /**
   * Returns an array of all scale factors corresponding to representations for a given native image.
   */
  getScaleFactors(): number[];

  /**
   * Returns the size of the image. If `scaleFactor` is passed, this returns the size corresponding to the image representation most closely matching the passed value.
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
   * Returns whether the image is a template image.
   *
   * @returns Whether the image is a template image.
   */
  isTemplateImage(): boolean;

  /**
   * Returns a resized copy of the image. If only the `height` or the `width` is specified then the current aspect ratio is preserved in the resized image.
   *
   * @param options - Options for the resize including `width`, `height`, and `quality`.
   * @returns The resized image.
   */
  resize(options: ElectronResizeOptions): ElectronNativeImage;

  /**
   * Marks the image as a template image.
   *
   * @param option - Whether the image should be marked as a template image.
   */
  setTemplateImage(option: boolean): void;

  /**
   * Returns a buffer that contains a copy of the image's raw bitmap pixel data.
   *
   * @param options - Options for the bitmap conversion including `scaleFactor`.
   * @returns The bitmap buffer.
   */
  toBitmap(options?: ElectronNativeImageScaleFactorOptions): Buffer;

  /**
   * Returns the data URL of the image.
   *
   * @param options - Options for the conversion including `scaleFactor`.
   * @returns The data URL string.
   */
  toDataURL(options?: ElectronNativeImageScaleFactorOptions): string;

  /**
   * Returns a buffer that contains the image's `JPEG` encoded data.
   *
   * @param quality - The JPEG quality between `0` and `100`.
   * @returns The JPEG buffer.
   */
  toJPEG(quality: number): Buffer;

  /**
   * Returns a buffer that contains the image's `PNG` encoded data.
   *
   * @param options - Options for the PNG conversion including `scaleFactor`.
   * @returns The PNG buffer.
   */
  toPNG(options?: ElectronNativeImageScaleFactorOptions): Buffer;
}
