import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronPoint } from './ElectronPoint.d.ts';
import type { ElectronTitleBarOverlay } from './ElectronTitleBarOverlay.d.ts';
import type { WebPreferences } from './WebPreferences.d.ts';

/**
 * Options for creating a new BrowserWindow.
 *
 * @public
 * @unofficial
 */
export interface BrowserWindowConstructorOptions {
  /**
   * Whether clicking an inactive window will also click through to the web contents. This option is not
   * configurable on platforms other than macOS.
   *
   * @default `false`
   */
  acceptFirstMouse?: boolean;

  /**
   * Whether the window should always stay on top of other windows.
   *
   * @default `false`
   */
  alwaysOnTop?: boolean;

  /**
   * Auto hide the menu bar unless the `Alt` key is pressed.
   *
   * @default `false`
   */
  autoHideMenuBar?: boolean;

  /**
   * The window's background color in Hex, RGB, RGBA, HSL, HSLA or named CSS color format. Alpha in `#AARRGGBB`
   * format is supported if `transparent` is set to `true`.
   *
   * @default `#FFF`
   */
  backgroundColor?: string;

  /** Show window in the center of the screen. */
  center?: boolean;

  /**
   * Whether window is closable. This is not implemented on Linux.
   *
   * @default `true`
   */
  closable?: boolean;

  /**
   * Forces using dark theme for the window, only works on some GTK+3 desktop environments.
   *
   * @default `false`
   */
  darkTheme?: boolean;

  /**
   * Whether to hide cursor when typing.
   *
   * @default `false`
   */
  disableAutoHideCursor?: boolean;

  /**
   * Enable the window to be resized larger than screen. Only relevant for macOS, as other OSes allow
   * larger-than-screen windows by default.
   *
   * @default `false`
   */
  enableLargerThanScreen?: boolean;

  /**
   * Whether the window can be focused. On Windows setting `focusable: false` also implies setting
   * `skipTaskbar: true`. On Linux setting `focusable: false` makes the window stop interacting with wm.
   *
   * @default `true`
   */
  focusable?: boolean;

  /**
   * Specify `false` to create a frameless window.
   *
   * @default `true`
   */
  frame?: boolean;

  /**
   * Whether the window should show in fullscreen. When explicitly set to `false` the fullscreen button will be
   * hidden or disabled on macOS.
   *
   * @default `false`
   */
  fullscreen?: boolean;

  /**
   * Whether the window can be put into fullscreen mode. On macOS, also whether the maximize/zoom button should
   * toggle full screen mode or maximize window.
   *
   * @default `true`
   */
  fullscreenable?: boolean;

  /**
   * Shows the title in the title bar in full screen mode on macOS for `hiddenInset` titleBarStyle.
   *
   * @default `false`
   * @deprecated Deprecated by Electron.
   */
  fullscreenWindowTitle?: boolean;

  /**
   * Whether window should have a shadow.
   *
   * @default `true`
   */
  hasShadow?: boolean;

  /**
   * Window's height in pixels.
   *
   * @default `600`
   */
  height?: number;

  /**
   * The window icon. On Windows it is recommended to use `ICO` icons to get best visual effects; it can also be
   * left undefined so the executable's icon will be used.
   */
  icon?: ElectronNativeImage | string;

  /**
   * Whether the window is in kiosk mode.
   *
   * @default `false`
   */
  kiosk?: boolean;

  /** Window's maximum height. Default is no limit. */
  maxHeight?: number;

  /**
   * Whether window is maximizable. This is not implemented on Linux.
   *
   * @default `true`
   */
  maximizable?: boolean;

  /** Window's maximum width. Default is no limit. */
  maxWidth?: number;

  /**
   * Window's minimum height.
   *
   * @default `0`
   */
  minHeight?: number;

  /**
   * Whether window is minimizable. This is not implemented on Linux.
   *
   * @default `true`
   */
  minimizable?: boolean;

  /**
   * Window's minimum width.
   *
   * @default `0`
   */
  minWidth?: number;

  /**
   * Whether this is a modal window. This only works when the window is a child window.
   *
   * @default `false`
   */
  modal?: boolean;

  /**
   * Whether window is movable. This is not implemented on Linux.
   *
   * @default `true`
   */
  movable?: boolean;

  /**
   * Set the initial opacity of the window, between `0.0` (fully transparent) and `1.0` (fully opaque). This is only
   * implemented on Windows and macOS.
   */
  opacity?: number;

  /**
   * Whether the renderer should be active when `show` is `false` and it has just been created. In order for
   * `document.visibilityState` to work correctly on first load with `show: false` this should be set to `false`.
   *
   * @default `true`
   */
  paintWhenInitiallyHidden?: boolean;

  /**
   * Specify parent window.
   *
   * @default `null`
   */
  parent?: ElectronBrowserWindow;

  /**
   * Whether window is resizable.
   *
   * @default `true`
   */
  resizable?: boolean;

  /**
   * Whether frameless window should have rounded corners on macOS.
   *
   * @default `true`
   */
  roundedCorners?: boolean;

  /**
   * Whether window should be shown when created.
   *
   * @default `true`
   */
  show?: boolean;

  /**
   * Use pre-Lion fullscreen on macOS.
   *
   * @default `false`
   */
  simpleFullscreen?: boolean;

  /**
   * Whether to show the window in taskbar.
   *
   * @default `false`
   */
  skipTaskbar?: boolean;

  /**
   * Tab group name, allows opening the window as a native tab on macOS 10.12+. Windows with the same tabbing
   * identifier will be grouped together.
   */
  tabbingIdentifier?: string;

  /**
   * Use `WS_THICKFRAME` style for frameless windows on Windows, which adds standard window frame. Setting it to
   * `false` will remove window shadow and window animations.
   *
   * @default `true`
   */
  thickFrame?: boolean;

  /**
   * Default window title. If the HTML tag `<title>` is defined in the HTML file loaded by `loadURL()`, this
   * property will be ignored.
   *
   * @default `Electron`
   */
  title?: string;

  /**
   * When using a frameless window in conjunction with `win.setWindowButtonVisibility(true)` on macOS or using a
   * `titleBarStyle` so that the standard window controls are visible, this property enables the Window Controls
   * Overlay JavaScript APIs and CSS Environment Variables. Specifying `true` will result in an overlay with default
   * system colors.
   *
   * @default `false`
   */
  titleBarOverlay?: boolean | ElectronTitleBarOverlay;

  /**
   * The style of window title bar (macOS and Windows).
   *
   * @default `default`
   */
  titleBarStyle?: 'customButtonsOnHover' | 'default' | 'hidden' | 'hiddenInset';

  /** Set a custom position for the traffic light buttons in frameless windows. */
  trafficLightPosition?: ElectronPoint;

  /**
   * Makes the window transparent. On Windows, does not work unless the window is frameless.
   *
   * @default `false`
   */
  transparent?: boolean;

  /** The type of window, default is normal window. */
  type?: string;

  /**
   * The `width` and `height` would be used as web page's size, which means the actual window's size will include
   * window frame's size and be slightly larger.
   *
   * @default `false`
   */
  useContentSize?: boolean;

  /**
   * Add a type of vibrancy effect to the window, only on macOS. Note that `appearance-based`, `light`, `dark`,
   * `medium-light`, and `ultra-dark` are deprecated and have been removed in macOS Catalina (10.15).
   */
  vibrancy?: 'appearance-based' | 'content' | 'dark' | 'fullscreen-ui' | 'header' | 'hud' | 'light' | 'medium-light' | 'menu' | 'popover' | 'selection' | 'sheet' | 'sidebar' | 'titlebar' | 'tooltip' | 'ultra-dark' | 'under-page' | 'under-window' | 'window';

  /** Specify how the material appearance should reflect window activity state on macOS. Must be used with the `vibrancy` property. */
  visualEffectState?: 'active' | 'followWindow' | 'inactive';

  /** Settings of web page's features. */
  webPreferences?: WebPreferences;

  /**
   * Window's width in pixels.
   *
   * @default `800`
   */
  width?: number;

  /** Window's left offset from screen (required if `y` is used). Default is to center the window. */
  x?: number;

  /** Window's top offset from screen (required if `x` is used). Default is to center the window. */
  y?: number;

  /**
   * Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking
   * the Window \> Zoom menu item. If `true`, the window will grow to the preferred width of the web page when
   * zoomed, `false` will cause it to zoom to the width of the screen.
   *
   * @default `false`
   */
  zoomToPageWidth?: boolean;
}
