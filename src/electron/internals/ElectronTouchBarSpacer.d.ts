import type { ElectronTouchBarSpacerConstructorOptions } from './ElectronTouchBarSpacerConstructorOptions.d.ts';

/**
 * A spacer item for a {@link ElectronTouchBar}.
 *
 * @public
 * @unofficial
 */
export declare class ElectronTouchBarSpacer {
  /** The size of the spacer. */
  size: 'flexible' | 'large' | 'small';

  /**
   * Create new instance of {@link ElectronTouchBarSpacer}.
   *
   * @param options - Options.
   */
  constructor(options: ElectronTouchBarSpacerConstructorOptions);
}
