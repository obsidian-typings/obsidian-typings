import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronTouchBar } from './ElectronTouchBar.d.ts';

/**
 * Options for creating a {@link ElectronTouchBarPopover}.
 *
 * @public
 * @unofficial
 */
export interface ElectronTouchBarPopoverConstructorOptions {
  /** Popover button icon. */
  icon?: ElectronNativeImage;

  /** Items to display in the popover. */
  items: ElectronTouchBar;

  /** Popover button text. */
  label?: string;

  /**
   * Whether to display a close button on the left of the popover.
   *
   * @default `true`
   */
  showCloseButton?: boolean;
}
