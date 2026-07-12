/**
 * Options for `NativeImage.addRepresentation`.
 *
 * @public
 * @unofficial
 */
export interface ElectronAddRepresentationOptions {
  /** The buffer containing the raw image data. */
  buffer?: Buffer;

  /** The data URL containing either a base 64 encoded PNG or JPEG image. */
  dataURL?: string;

  /**
   * The height of the image representation. Required if a bitmap buffer is specified as `buffer`.
   *
   * @default `0`
   */
  height?: number;

  /** The scale factor to add the image representation for. */
  scaleFactor: number;

  /**
   * The width of the image representation. Required if a bitmap buffer is specified as `buffer`.
   *
   * @default `0`
   */
  width?: number;
}
