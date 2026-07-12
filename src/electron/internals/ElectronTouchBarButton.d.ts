import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronTouchBarButtonConstructorOptions } from './ElectronTouchBarButtonConstructorOptions.d.ts';

/**
 * A button item for a {@link ElectronTouchBar}.
 *
 * @public
 * @unofficial
 */
export declare class ElectronTouchBarButton {
  /** Description of the button to be read by a screen reader. Read only if no label is set. */
  accessibilityLabel: string;

  /** Hex code representing the button's current background color. */
  backgroundColor: string;

  /** Whether the button is in an enabled state. */
  enabled: boolean;

  /** The button's current icon. */
  icon: ElectronNativeImage;

  /** The position of the icon. */
  iconPosition: 'left' | 'overlay' | 'right';

  /** The button's current text. */
  label: string;

  /**
   * Create new instance of {@link ElectronTouchBarButton}.
   *
   * @param options - Options.
   */
  constructor(options: ElectronTouchBarButtonConstructorOptions);
}
