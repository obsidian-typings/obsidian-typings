import type { ElectronSize } from './ElectronSize.d.ts';

/**
 * Options for `desktopCapturer.getSources`.
 *
 * @public
 * @unofficial
 */
export interface ElectronSourcesOptions {
  /**
   * Set to `true` to enable fetching window icons. When `false` the `appIcon` property of the sources returns
   * `null`, as it does if a source has the type screen.
   *
   * @default `false`
   */
  fetchWindowIcons?: boolean;

  /**
   * The size that the media source thumbnail should be scaled to. Set width or height to `0` when thumbnails
   * are not needed, to save the processing time required for capturing the content of each window and screen.
   *
   * @default `{ width: 150, height: 150 }`
   */
  thumbnailSize?: ElectronSize;

  /**
   * An array of strings listing the types of desktop sources to be captured. Available types are `screen` and `window`.
   */
  types: string[];
}
