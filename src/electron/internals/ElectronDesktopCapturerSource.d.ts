import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';

/**
 * A screen or individual window that can be captured, returned by `desktopCapturer.getSources`.
 *
 * @public
 * @unofficial
 */
export interface ElectronDesktopCapturerSource {
  /**
   * An icon image of the application that owns the window, or `null` if the source has a type screen.
   * The size of the icon is not known in advance and depends on what the application provides.
   */
  appIcon: ElectronNativeImage;

  /**
   * A unique identifier that corresponds to the `id` of the matching display returned by the Screen API.
   * On some platforms, this is equivalent to the `XX` portion of the `id` field above and on others it differs.
   * It is an empty string if not available.
   */
  display_id: string;

  /**
   * The identifier of a window or screen that can be used as a `chromeMediaSourceId` constraint when calling
   * `navigator.webkitGetUserMedia`. The format of the identifier is `window:XX:YY` or `screen:ZZ:0`.
   * `XX` is the windowID/handle, `YY` is `1` for the current process and `0` for all others, and `ZZ` is a
   * sequential number representing the screen.
   */
  id: string;

  /**
   * A screen source is named either `Entire Screen` or `Screen <index>`, while the name of a window source
   * matches the window title.
   */
  name: string;

  /**
   * A thumbnail image. There is no guarantee that the size of the thumbnail matches the `thumbnailSize`
   * specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale
   * of the screen or window.
   */
  thumbnail: ElectronNativeImage;
}
