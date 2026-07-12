import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';

/**
 * An item shown in a {@link ElectronTouchBarScrubber}.
 *
 * @public
 * @unofficial
 */
export interface ElectronScrubberItem {
  /** The image to appear in this item. */
  icon?: ElectronNativeImage;

  /** The text to appear in this item. */
  label?: string;
}
