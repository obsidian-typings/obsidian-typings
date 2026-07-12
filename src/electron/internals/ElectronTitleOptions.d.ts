/**
 * Options for {@link ElectronTray.setTitle}.
 *
 * @public
 * @unofficial
 */
export interface ElectronTitleOptions {
  /**
   * The font family variant to display, can be `monospaced` or `monospacedDigit`. `monospaced` is available in macOS 10.15+ and `monospacedDigit` is available in macOS 10.11+. When left blank, the title uses the default system font.
   */
  fontType?: 'monospaced' | 'monospacedDigit';
}
