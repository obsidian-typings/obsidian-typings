import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';

/**
 * A button in a thumbnail toolbar (Windows only).
 *
 * @public
 * @unofficial
 */
export interface ElectronThumbarButton {
  /**
   * Control specific states and behaviors of the button.
   *
   * @default `['enabled']`
   */
  flags?: string[];

  /** The icon showing in the thumbnail toolbar. */
  icon: ElectronNativeImage;

  /** The text of the button's tooltip. */
  tooltip?: string;

  /** Callback invoked when the button is clicked. */
  click(): void;
}
