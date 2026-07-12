import type { ElectronTouchBarSliderConstructorOptions } from './ElectronTouchBarSliderConstructorOptions.d.ts';

/**
 * A slider item for a {@link ElectronTouchBar}.
 *
 * @public
 * @unofficial
 */
export declare class ElectronTouchBarSlider {
  /** The slider's current text. */
  label: string;

  /** The slider's current maximum value. */
  maxValue: number;

  /** The slider's current minimum value. */
  minValue: number;

  /** The slider's current value. */
  value: number;

  /**
   * Create new instance of {@link ElectronTouchBarSlider}.
   *
   * @param options - Options.
   */
  constructor(options: ElectronTouchBarSliderConstructorOptions);
}
