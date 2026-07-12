/**
 * Options for {@link ElectronBrowserWindow.setIgnoreMouseEvents}.
 *
 * @public
 * @unofficial
 */
export interface ElectronIgnoreMouseEventsOptions {
  /**
   * If `true`, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only
   * used when `ignore` is `true`. If `ignore` is `false`, forwarding is always disabled regardless of this value.
   *
   * Available on macOS and Windows.
   */
  forward?: boolean;
}
