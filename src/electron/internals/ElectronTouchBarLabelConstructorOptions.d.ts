/**
 * Options for creating a {@link ElectronTouchBarLabel}.
 *
 * @public
 * @unofficial
 */
export interface ElectronTouchBarLabelConstructorOptions {
  /** A short description of the label for use by screen readers like VoiceOver. */
  accessibilityLabel?: string;

  /** Text to display. */
  label?: string;

  /** Hex color of text, i.e `#ABCDEF`. */
  textColor?: string;
}
