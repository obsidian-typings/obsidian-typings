import type { ElectronTouchBarColorPickerConstructorOptions } from './ElectronTouchBarColorPickerConstructorOptions.d.ts';

/**
 * A color picker item for a {@link ElectronTouchBar}.
 *
 * @public
 * @unofficial
 */
export declare class ElectronTouchBarColorPicker {
  /** The color picker's available colors to select. */
  availableColors: string[];

  /** Hex code representing the color picker's currently selected color. */
  selectedColor: string;

  /**
   * Create new instance of {@link ElectronTouchBarColorPicker}.
   *
   * @param options - Options.
   */
  constructor(options: ElectronTouchBarColorPickerConstructorOptions);
}
