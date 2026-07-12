/**
 * Options for `NativeImage.resize`.
 *
 * @public
 * @unofficial
 */
export interface ElectronResizeOptions {
  /** The desired height of the resized image. Defaults to the image's height. */
  height?: number;

  /**
   * The desired quality of the resized image. Possible values are `best`, `better`, or `good`. These values express a desired quality/speed tradeoff that is translated into an algorithm-specific method depending on the capabilities (CPU, GPU) of the underlying platform.
   *
   * @default `'best'`
   */
  quality?: string;

  /** The desired width of the resized image. Defaults to the image's width. */
  width?: number;
}
