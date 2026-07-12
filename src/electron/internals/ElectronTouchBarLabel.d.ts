import type { ElectronTouchBarLabelConstructorOptions } from './ElectronTouchBarLabelConstructorOptions.d.ts';

/**
 * A label item for a {@link ElectronTouchBar}.
 *
 * @public
 * @unofficial
 */
export declare class ElectronTouchBarLabel {
  /** Description of the label to be read by a screen reader. */
  accessibilityLabel: string;

  /** The label's current text. */
  label: string;

  /** Hex code representing the label's current text color. */
  textColor: string;

  /**
   * Create new instance of {@link ElectronTouchBarLabel}.
   *
   * @param options - Options.
   */
  constructor(options: ElectronTouchBarLabelConstructorOptions);
}
