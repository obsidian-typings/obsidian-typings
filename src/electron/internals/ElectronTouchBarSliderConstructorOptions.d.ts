/**
 * Options for creating a {@link ElectronTouchBarSlider}.
 *
 * @public
 * @unofficial
 */
export interface ElectronTouchBarSliderConstructorOptions {
  /** Label text. */
  label?: string;

  /** Maximum value. */
  maxValue?: number;

  /** Minimum value. */
  minValue?: number;

  /** Selected value. */
  value?: number;

  /** Callback invoked when the slider is changed. */
  change?(newValue: number): void;
}
