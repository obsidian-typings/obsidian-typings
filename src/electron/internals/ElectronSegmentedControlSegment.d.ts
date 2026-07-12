import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';

/**
 * A segment shown in a {@link ElectronTouchBarSegmentedControl}.
 *
 * @public
 * @unofficial
 */
export interface ElectronSegmentedControlSegment {
  /**
   * Whether this segment is selectable.
   *
   * @default `true`
   */
  enabled?: boolean;

  /** The image to appear in this segment. */
  icon?: ElectronNativeImage;

  /** The text to appear in this segment. */
  label?: string;
}
