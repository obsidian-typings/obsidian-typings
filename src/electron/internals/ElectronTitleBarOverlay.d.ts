/**
 * Configuration for the Window Controls Overlay when creating a window.
 *
 * @public
 * @unofficial
 */
export interface ElectronTitleBarOverlay {
  /**
   * The CSS color of the Window Controls Overlay when enabled (Windows only). Default is the system color.
   */
  color?: string;

  /**
   * The height of the title bar and Window Controls Overlay in pixels (macOS and Windows). Default is the system
   * height.
   */
  height?: number;

  /**
   * The CSS color of the symbols on the Window Controls Overlay when enabled (Windows only). Default is the system
   * color.
   */
  symbolColor?: string;
}
