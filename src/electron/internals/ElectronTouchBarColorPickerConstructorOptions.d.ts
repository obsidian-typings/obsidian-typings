/**
 * Options for creating a {@link ElectronTouchBarColorPicker}.
 *
 * @public
 * @unofficial
 */
export interface ElectronTouchBarColorPickerConstructorOptions {
  /** Array of hex color strings to appear as possible colors to select. */
  availableColors?: string[];

  /** The selected hex color in the picker, i.e `#ABCDEF`. */
  selectedColor?: string;

  /** Callback invoked when a color is selected. */
  change?(color: string): void;
}
