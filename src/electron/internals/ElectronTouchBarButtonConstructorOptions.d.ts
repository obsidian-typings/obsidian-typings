import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';

/**
 * Options for creating a {@link ElectronTouchBarButton}.
 *
 * @public
 * @unofficial
 */
export interface ElectronTouchBarButtonConstructorOptions {
  /** A short description of the button for use by screen readers like VoiceOver. */
  accessibilityLabel?: string;

  /** Button background color in hex format, i.e `#ABCDEF`. */
  backgroundColor?: string;

  /**
   * Whether the button is in an enabled state.
   *
   * @default `true`
   */
  enabled?: boolean;

  /** Button icon. */
  icon?: ElectronNativeImage | string;

  /**
   * Position of the icon.
   *
   * @default `overlay`
   */
  iconPosition?: 'left' | 'overlay' | 'right';

  /** Button text. */
  label?: string;

  /** Callback invoked when the button is clicked. */
  click?(): void;
}
