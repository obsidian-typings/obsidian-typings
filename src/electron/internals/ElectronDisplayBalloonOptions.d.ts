import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';

/**
 * Options for {@link ElectronTray.displayBalloon}.
 *
 * @public
 * @unofficial
 */
export interface ElectronDisplayBalloonOptions {
  /** The content of the balloon. */
  content: string;

  /** Icon to use when `iconType` is `custom`. */
  icon?: ElectronNativeImage | string;

  /**
   * Can be `none`, `info`, `warning`, `error` or `custom`.
   *
   * @default `custom`
   */
  iconType?: 'custom' | 'error' | 'info' | 'none' | 'warning';

  /**
   * The large version of the icon should be used. Maps to `NIIF_LARGE_ICON`.
   *
   * @default `true`
   */
  largeIcon?: boolean;

  /**
   * Do not play the associated sound. Maps to `NIIF_NOSOUND`.
   *
   * @default `false`
   */
  noSound?: boolean;

  /**
   * Do not display the balloon notification if the current user is in "quiet time". Maps to `NIIF_RESPECT_QUIET_TIME`.
   *
   * @default `false`
   */
  respectQuietTime?: boolean;

  /** The title of the balloon. */
  title: string;
}
