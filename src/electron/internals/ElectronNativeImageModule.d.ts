import type { ElectronCreateFromBitmapOptions } from './ElectronCreateFromBitmapOptions.d.ts';
import type { ElectronCreateFromBufferOptions } from './ElectronCreateFromBufferOptions.d.ts';
import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronSize } from './ElectronSize.d.ts';

/**
 * Electron nativeImage module for creating tray, dock, and application images from various sources.
 *
 * @public
 * @unofficial
 */
export interface ElectronNativeImageModule {
  /**
   * Creates an empty `NativeImage` instance.
   *
   * @returns An empty image.
   */
  createEmpty(): ElectronNativeImage;

  /**
   * Creates a new `NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.
   *
   * @param buffer - The raw bitmap pixel data.
   * @param options - Options describing the bitmap dimensions and scale factor.
   * @returns The created image.
   */
  createFromBitmap(buffer: Buffer, options: ElectronCreateFromBitmapOptions): ElectronNativeImage;

  /**
   * Creates a new `NativeImage` instance from `buffer`. Tries to decode as PNG or JPEG first.
   *
   * @param buffer - The image data to decode.
   * @param options - Options describing the image dimensions and scale factor.
   * @returns The created image.
   */
  createFromBuffer(buffer: Buffer, options?: ElectronCreateFromBufferOptions): ElectronNativeImage;

  /**
   * Creates a new `NativeImage` instance from `dataURL`.
   *
   * @param dataURL - The data URL to create the image from.
   * @returns The created image.
   */
  createFromDataURL(dataURL: string): ElectronNativeImage;

  /**
   * Creates a new `NativeImage` instance from the `NSImage` that maps to the given image name. Only available on macOS.
   *
   * @param imageName - The name of the system image.
   * @param hslShift - An HSL shift applied to the image, as `[hue, saturation, lightness]`.
   * @returns The created image.
   */
  createFromNamedImage(imageName: string, hslShift?: number[]): ElectronNativeImage;

  /**
   * Creates a new `NativeImage` instance from a file located at `path`. This method returns an empty image if the `path` does not exist, cannot be read, or is not a valid image.
   *
   * @param path - The path to the image file.
   * @returns The created image.
   */
  createFromPath(path: string): ElectronNativeImage;

  /**
   * Creates a thumbnail preview image for the file at `path`. Only available on macOS and Windows.
   *
   * @param path - The path to the file to create a thumbnail for.
   * @param maxSize - The maximum size of the thumbnail.
   * @returns A promise that fulfills with the file's thumbnail preview image.
   */
  createThumbnailFromPath(path: string, maxSize: ElectronSize): Promise<ElectronNativeImage>;
}
