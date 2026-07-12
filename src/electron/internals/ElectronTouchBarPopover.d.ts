import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronTouchBarPopoverConstructorOptions } from './ElectronTouchBarPopoverConstructorOptions.d.ts';

/**
 * A popover item for a {@link ElectronTouchBar}.
 *
 * @public
 * @unofficial
 */
export declare class ElectronTouchBarPopover {
  /** The popover's current button icon. */
  icon: ElectronNativeImage;

  /** The popover's current button text. */
  label: string;

  /**
   * Create new instance of {@link ElectronTouchBarPopover}.
   *
   * @param options - Options.
   */
  constructor(options: ElectronTouchBarPopoverConstructorOptions);
}
