/**
 * Options for {@link ElectronBrowserWindow.setTitleBarOverlay}.
 *
 * @public
 * @unofficial
 */
export interface ElectronTitleBarOverlayOptions {
  /** The CSS color of the Window Controls Overlay when enabled (Windows only). */
  color?: string;

  /** The height of the title bar and Window Controls Overlay in pixels (Windows only). */
  height?: number;

  /** The CSS color of the symbols on the Window Controls Overlay when enabled (Windows only). */
  symbolColor?: string;
}
