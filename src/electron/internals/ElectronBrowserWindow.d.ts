import type { BrowserWindowConstructorOptions } from './BrowserWindowConstructorOptions.d.ts';
import type { ElectronAppDetailsOptions } from './ElectronAppDetailsOptions.d.ts';
import type { ElectronBrowserView } from './ElectronBrowserView.d.ts';
import type { ElectronBrowserWindowLoadFileOptions } from './ElectronBrowserWindowLoadFileOptions.d.ts';
import type { ElectronBrowserWindowLoadURLOptions } from './ElectronBrowserWindowLoadURLOptions.d.ts';
import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronIgnoreMouseEventsOptions } from './ElectronIgnoreMouseEventsOptions.d.ts';
import type { ElectronMenu } from './ElectronMenu.d.ts';
import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronPoint } from './ElectronPoint.d.ts';
import type { ElectronProgressBarOptions } from './ElectronProgressBarOptions.d.ts';
import type { ElectronRectangle } from './ElectronRectangle.d.ts';
import type { ElectronSize } from './ElectronSize.d.ts';
import type { ElectronThumbarButton } from './ElectronThumbarButton.d.ts';
import type { ElectronTitleBarOverlayOptions } from './ElectronTitleBarOverlayOptions.d.ts';
import type { ElectronTouchBar } from './ElectronTouchBar.d.ts';
import type { ElectronVisibleOnAllWorkspacesOptions } from './ElectronVisibleOnAllWorkspacesOptions.d.ts';
import type { ElectronWebContents } from './ElectronWebContents.d.ts';
import type { ElectronWillResizeDetails } from './ElectronWillResizeDetails.d.ts';

/**
 * Electron BrowserWindow for creating and managing application windows.
 *
 * @public
 * @unofficial
 */
export declare class ElectronBrowserWindow {
  /**
   * An alternative title provided only to accessibility tools such as screen readers. This string is not directly
   * visible to users.
   */
  accessibleTitle: string;

  /** Whether the window menu bar should hide itself automatically. */
  autoHideMenuBar: boolean;

  /** Whether the window can be manually closed by user. On Linux the setter is a no-op. */
  closable: boolean;

  /** Whether the window's document has been edited (macOS only). */
  documentEdited: boolean;

  /** Whether the window is excluded from the application's Windows menu (macOS only). */
  excludedFromShownWindowsMenu: boolean;

  /** Whether the window is focusable (macOS and Windows). */
  focusable: boolean;

  /** Whether the window is in fullscreen mode. */
  fullScreen: boolean;

  /** Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window. */
  fullScreenable: boolean;

  /** The unique identifier of the window, unique among all `BrowserWindow` instances of the entire application. */
  readonly id: number;

  /** Whether the window is in kiosk mode. */
  kiosk: boolean;

  /** Whether the window can be manually maximized by user. On Linux the setter is a no-op. */
  maximizable: boolean;

  /** Whether the menu bar should be visible (Windows and Linux). */
  menuBarVisible: boolean;

  /** Whether the window can be manually minimized by user. On Linux the setter is a no-op. */
  minimizable: boolean;

  /** Whether the window can be moved by user. On Linux the setter is a no-op. */
  movable: boolean;

  /** The pathname of the file the window represents (macOS only). */
  representedFilename: string;

  /** Whether the window can be manually resized by user. */
  resizable: boolean;

  /** Whether the window has a shadow. */
  shadow: boolean;

  /** Whether the window is in simple (pre-Lion) fullscreen mode. */
  simpleFullScreen: boolean;

  /** The title of the native window. */
  title: string;

  /** Whether the window is visible on all workspaces. Always returns `false` on Windows. */
  visibleOnAllWorkspaces: boolean;

  /** The web contents owned by this window. All web page related events and operations will be done via it. */
  readonly webContents: ElectronWebContents;

  /**
   * Create new instance of {@link ElectronBrowserWindow}.
   *
   * @param options - Options.
   */
  constructor(options?: BrowserWindowConstructorOptions);

  /**
   * Replacement API for `setBrowserView` supporting work with multi browser views.
   *
   * @param browserView - The view to add.
   */
  addBrowserView(browserView: ElectronBrowserView): void;

  /**
   * Registers a listener for the given window event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This BrowserWindow instance.
   */
  addListener(event: 'always-on-top-changed', listener: (event: ElectronEvent, isAlwaysOnTop: boolean) => void): this;
  /** */
  addListener(event: 'app-command', listener: (event: ElectronEvent, command: string) => void): this;
  /** */
  addListener(event: 'blur', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'close', listener: (event: ElectronEvent) => void): this;
  /** */
  addListener(event: 'closed', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'enter-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'enter-html-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'focus', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'hide', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'leave-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'leave-html-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'maximize', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'minimize', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'move', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'moved', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'new-window-for-tab', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'page-title-updated', listener: (event: ElectronEvent, title: string, explicitSet: boolean) => void): this;
  /** */
  addListener(event: 'ready-to-show', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'resize', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'resized', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'responsive', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'restore', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'rotate-gesture', listener: (event: ElectronEvent, rotation: number) => void): this;
  /** */
  addListener(event: 'scroll-touch-begin', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'scroll-touch-edge', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'scroll-touch-end', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'session-end', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'sheet-begin', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'sheet-end', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'show', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'swipe', listener: (event: ElectronEvent, direction: string) => void): this;
  /** */
  addListener(event: 'system-context-menu', listener: (event: ElectronEvent, point: ElectronPoint) => void): this;
  /** */
  addListener(event: 'unmaximize', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'unresponsive', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'will-move', listener: (event: ElectronEvent, newBounds: ElectronRectangle) => void): this;
  /** */
  addListener(event: 'will-resize', listener: (event: ElectronEvent, newBounds: ElectronRectangle, details: ElectronWillResizeDetails) => void): this;

  /**
   * Adds a window as a tab on this window, after the tab for the window instance (macOS only).
   *
   * @param browserWindow - The window to add as a tab.
   */
  addTabbedWindow(browserWindow: ElectronBrowserWindow): void;

  /** Removes focus from the window. */
  blur(): void;

  /** Removes focus from the web view. */
  blurWebView(): void;

  /**
   * Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.
   *
   * @param rect - The bounds to capture.
   * @returns A promise that resolves with the captured image.
   */
  capturePage(rect?: ElectronRectangle): Promise<ElectronNativeImage>;

  /** Moves window to the center of the screen. */
  center(): void;

  /** Tries to close the window. This has the same effect as a user manually clicking the close button. */
  close(): void;

  /** Closes the currently open Quick Look panel (macOS only). */
  closeFilePreview(): void;

  /** Force-closes the window; the `unload` and `beforeunload` events won't be emitted, but `closed` is guaranteed. */
  destroy(): void;

  /**
   * Starts or stops flashing the window to attract user's attention.
   *
   * @param flag - Whether to flash the window.
   */
  flashFrame(flag: boolean): void;

  /** Focuses on the window. */
  focus(): void;

  /** Focuses on the web view. */
  focusOnWebView(): void;

  /**
   * Returns the window that owns the given `browserView`.
   *
   * @param browserView - The view to look up.
   * @returns The owning BrowserWindow or `null` if the view is not attached to any window.
   */
  static fromBrowserView(browserView: ElectronBrowserView): ElectronBrowserWindow | null;

  /**
   * Returns the window with the given `id`.
   *
   * @param id - The window id.
   * @returns The BrowserWindow or `null` if not found.
   */
  static fromId(id: number): ElectronBrowserWindow | null;

  /**
   * Returns the window that owns the given `webContents`.
   *
   * @param webContents - The web contents to look up.
   * @returns The owning BrowserWindow or `null` if the contents are not owned by a window.
   */
  static fromWebContents(webContents: ElectronWebContents): ElectronBrowserWindow | null;

  /**
   * Returns all opened browser windows.
   *
   * @returns An array of all BrowserWindow instances.
   */
  static getAllWindows(): ElectronBrowserWindow[];

  /**
   * Returns the background color of the window in Hex (`#RRGGBB`) format.
   *
   * @returns The background color.
   */
  getBackgroundColor(): string;

  /**
   * Returns the bounds of the window.
   *
   * @returns The window bounds.
   */
  getBounds(): ElectronRectangle;

  /**
   * Returns the `BrowserView` attached to this window.
   *
   * @returns The attached view or `null` if one is not attached.
   */
  getBrowserView(): ElectronBrowserView | null;

  /**
   * Returns all views attached with `addBrowserView` or `setBrowserView`.
   *
   * @returns An array of attached views.
   */
  getBrowserViews(): ElectronBrowserView[];

  /**
   * Returns all child windows.
   *
   * @returns An array of child windows.
   */
  getChildWindows(): ElectronBrowserWindow[];

  /**
   * Returns the bounds of the window's client area.
   *
   * @returns The content bounds.
   */
  getContentBounds(): ElectronRectangle;

  /**
   * Returns the window's client area's width and height.
   *
   * @returns A tuple of `[width, height]`.
   */
  getContentSize(): number[];

  /**
   * Returns the window that is focused in this application.
   *
   * @returns The focused BrowserWindow or `null` if none is focused.
   */
  static getFocusedWindow(): ElectronBrowserWindow | null;

  /**
   * Returns the window's maximum width and height.
   *
   * @returns A tuple of `[width, height]`.
   */
  getMaximumSize(): number[];

  /**
   * Returns the window id in the format of DesktopCapturerSource's id.
   *
   * @returns The media source id.
   */
  getMediaSourceId(): string;

  /**
   * Returns the window's minimum width and height.
   *
   * @returns A tuple of `[width, height]`.
   */
  getMinimumSize(): number[];

  /**
   * Returns the platform-specific handle of the window.
   *
   * @returns The native window handle buffer.
   */
  getNativeWindowHandle(): Buffer;

  /**
   * Returns the window bounds of the normal state, regardless of the current window state.
   *
   * @returns The normal-state bounds.
   */
  getNormalBounds(): ElectronRectangle;

  /**
   * Returns the opacity of the window, between `0.0` (fully transparent) and `1.0` (fully opaque). On Linux, always
   * returns `1`.
   *
   * @returns The window opacity.
   */
  getOpacity(): number;

  /**
   * Returns the parent window.
   *
   * @returns The parent window or `null` if there is no parent.
   */
  getParentWindow(): ElectronBrowserWindow | null;

  /**
   * Returns the window's current position.
   *
   * @returns A tuple of `[x, y]` coordinates.
   */
  getPosition(): number[];

  /**
   * Returns the pathname of the file the window represents (macOS only).
   *
   * @returns The represented filename.
   */
  getRepresentedFilename(): string;

  /**
   * Returns the window's width and height.
   *
   * @returns A tuple of `[width, height]`.
   */
  getSize(): number[];

  /**
   * Returns the title of the native window.
   *
   * @returns The window title.
   */
  getTitle(): string;

  /**
   * Returns the custom position for the traffic light buttons in a frameless window (macOS only).
   *
   * @returns The traffic light position.
   */
  getTrafficLightPosition(): ElectronPoint;

  /**
   * Returns whether the window has a shadow.
   *
   * @returns Whether the window has a shadow.
   */
  hasShadow(): boolean;

  /** Hides the window. */
  hide(): void;

  /**
   * Hooks a windows message. The `callback` is called when the message is received in the WndProc (Windows only).
   *
   * @param message - The message identifier.
   * @param callback - The callback invoked when the message is received.
   */
  hookWindowMessage(message: number, callback: (wParam: unknown, lParam: unknown) => void): void;

  /**
   * Returns whether the window is always on top of other windows.
   *
   * @returns Whether the window is always on top.
   */
  isAlwaysOnTop(): boolean;

  /**
   * Returns whether the window can be manually closed by user. On Linux always returns `true` (macOS and Windows).
   *
   * @returns Whether the window is closable.
   */
  isClosable(): boolean;

  /**
   * Returns whether the window has been destroyed.
   *
   * @returns Whether the window is destroyed.
   */
  isDestroyed(): boolean;

  /**
   * Returns whether the window's document has been edited (macOS only).
   *
   * @returns Whether the document has been edited.
   */
  isDocumentEdited(): boolean;

  /**
   * Returns whether the window is enabled.
   *
   * @returns Whether the window is enabled.
   */
  isEnabled(): boolean;

  /** Returns whether the window can be focused (macOS and Windows). */
  isFocusable(): void;

  /**
   * Returns whether the window is focused.
   *
   * @returns Whether the window is focused.
   */
  isFocused(): boolean;

  /**
   * Returns whether the window is in fullscreen mode.
   *
   * @returns Whether the window is fullscreen.
   */
  isFullScreen(): boolean;

  /**
   * Returns whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.
   *
   * @returns Whether the window is fullscreenable.
   */
  isFullScreenable(): boolean;

  /**
   * Returns whether the window is in kiosk mode.
   *
   * @returns Whether the window is in kiosk mode.
   */
  isKiosk(): boolean;

  /**
   * Returns whether the window can be manually maximized by user. On Linux always returns `true` (macOS and Windows).
   *
   * @returns Whether the window is maximizable.
   */
  isMaximizable(): boolean;

  /**
   * Returns whether the window is maximized.
   *
   * @returns Whether the window is maximized.
   */
  isMaximized(): boolean;

  /**
   * Returns whether the menu bar automatically hides itself.
   *
   * @returns Whether the menu bar auto-hides.
   */
  isMenuBarAutoHide(): boolean;

  /**
   * Returns whether the menu bar is visible.
   *
   * @returns Whether the menu bar is visible.
   */
  isMenuBarVisible(): boolean;

  /**
   * Returns whether the window can be manually minimized by user. On Linux always returns `true` (macOS and Windows).
   *
   * @returns Whether the window is minimizable.
   */
  isMinimizable(): boolean;

  /**
   * Returns whether the window is minimized.
   *
   * @returns Whether the window is minimized.
   */
  isMinimized(): boolean;

  /**
   * Returns whether the current window is a modal window.
   *
   * @returns Whether the window is modal.
   */
  isModal(): boolean;

  /**
   * Returns whether the window can be moved by user. On Linux always returns `true` (macOS and Windows).
   *
   * @returns Whether the window is movable.
   */
  isMovable(): boolean;

  /**
   * Returns whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).
   *
   * @returns Whether the window is in normal state.
   */
  isNormal(): boolean;

  /**
   * Returns whether the window can be manually resized by user.
   *
   * @returns Whether the window is resizable.
   */
  isResizable(): boolean;

  /**
   * Returns whether the window is in simple (pre-Lion) fullscreen mode (macOS only).
   *
   * @returns Whether the window is in simple fullscreen mode.
   */
  isSimpleFullScreen(): boolean;

  /**
   * Returns whether the window is in Windows 10 tablet mode (Windows only).
   *
   * @returns Whether the window is in tablet mode.
   */
  isTabletMode(): boolean;

  /**
   * Returns whether the window is visible to the user.
   *
   * @returns Whether the window is visible.
   */
  isVisible(): boolean;

  /**
   * Returns whether the window is visible on all workspaces. Always returns `false` on Windows.
   *
   * @returns Whether the window is visible on all workspaces.
   */
  isVisibleOnAllWorkspaces(): boolean;

  /**
   * Returns whether the message is hooked (Windows only).
   *
   * @param message - The message identifier.
   * @returns Whether the message is hooked.
   */
  isWindowMessageHooked(message: number): boolean;

  /**
   * Loads a file into the window. Same as `webContents.loadFile`.
   *
   * @param filePath - The path to an HTML file relative to the root of the application.
   * @param options - Options for loading the file.
   * @returns A promise that resolves when the page has finished loading.
   */
  loadFile(filePath: string, options?: ElectronBrowserWindowLoadFileOptions): Promise<void>;

  /**
   * Loads a URL into the window. Same as `webContents.loadURL`.
   *
   * @param url - A remote address or a path to a local HTML file using the `file://` protocol.
   * @param options - Options for loading the URL.
   * @returns A promise that resolves when the page has finished loading.
   */
  loadURL(url: string, options?: ElectronBrowserWindowLoadURLOptions): Promise<void>;

  /** Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already. */
  maximize(): void;

  /** Merges all windows into one window with multiple tabs when native tabs are enabled (macOS only). */
  mergeAllWindows(): void;

  /** Minimizes the window. On some platforms the minimized window will be shown in the Dock. */
  minimize(): void;

  /**
   * Moves window above the source window in the sense of z-order.
   *
   * @param mediaSourceId - The media source id of the window to move above.
   */
  moveAbove(mediaSourceId: string): void;

  /** Moves the current tab into a new window if native tabs are enabled and there is more than one tab (macOS only). */
  moveTabToNewWindow(): void;

  /** Moves window to top (z-order) regardless of focus. */
  moveTop(): void;

  /**
   * Registers a listener for the given window event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This BrowserWindow instance.
   */
  on(event: 'always-on-top-changed', listener: (event: ElectronEvent, isAlwaysOnTop: boolean) => void): this;
  /** */
  on(event: 'app-command', listener: (event: ElectronEvent, command: string) => void): this;
  /** */
  on(event: 'blur', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'close', listener: (event: ElectronEvent) => void): this;
  /** */
  on(event: 'closed', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'enter-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'enter-html-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'focus', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'hide', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'leave-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'leave-html-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'maximize', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'minimize', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'move', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'moved', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'new-window-for-tab', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'page-title-updated', listener: (event: ElectronEvent, title: string, explicitSet: boolean) => void): this;
  /** */
  on(event: 'ready-to-show', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'resize', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'resized', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'responsive', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'restore', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'rotate-gesture', listener: (event: ElectronEvent, rotation: number) => void): this;
  /** */
  on(event: 'scroll-touch-begin', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'scroll-touch-edge', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'scroll-touch-end', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'session-end', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'sheet-begin', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'sheet-end', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'show', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'swipe', listener: (event: ElectronEvent, direction: string) => void): this;
  /** */
  on(event: 'system-context-menu', listener: (event: ElectronEvent, point: ElectronPoint) => void): this;
  /** */
  on(event: 'unmaximize', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'unresponsive', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'will-move', listener: (event: ElectronEvent, newBounds: ElectronRectangle) => void): this;
  /** */
  on(event: 'will-resize', listener: (event: ElectronEvent, newBounds: ElectronRectangle, details: ElectronWillResizeDetails) => void): this;

  /**
   * Registers a one-time listener for the given window event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This BrowserWindow instance.
   */
  once(event: 'always-on-top-changed', listener: (event: ElectronEvent, isAlwaysOnTop: boolean) => void): this;
  /** */
  once(event: 'app-command', listener: (event: ElectronEvent, command: string) => void): this;
  /** */
  once(event: 'blur', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'close', listener: (event: ElectronEvent) => void): this;
  /** */
  once(event: 'closed', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'enter-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'enter-html-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'focus', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'hide', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'leave-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'leave-html-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'maximize', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'minimize', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'move', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'moved', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'new-window-for-tab', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'page-title-updated', listener: (event: ElectronEvent, title: string, explicitSet: boolean) => void): this;
  /** */
  once(event: 'ready-to-show', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'resize', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'resized', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'responsive', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'restore', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'rotate-gesture', listener: (event: ElectronEvent, rotation: number) => void): this;
  /** */
  once(event: 'scroll-touch-begin', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'scroll-touch-edge', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'scroll-touch-end', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'session-end', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'sheet-begin', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'sheet-end', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'show', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'swipe', listener: (event: ElectronEvent, direction: string) => void): this;
  /** */
  once(event: 'system-context-menu', listener: (event: ElectronEvent, point: ElectronPoint) => void): this;
  /** */
  once(event: 'unmaximize', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'unresponsive', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'will-move', listener: (event: ElectronEvent, newBounds: ElectronRectangle) => void): this;
  /** */
  once(event: 'will-resize', listener: (event: ElectronEvent, newBounds: ElectronRectangle, details: ElectronWillResizeDetails) => void): this;

  /**
   * Uses Quick Look to preview a file at a given path (macOS only).
   *
   * @param path - The path to the file to preview.
   * @param displayName - The name of the file to display in the Quick Look modal view.
   */
  previewFile(path: string, displayName?: string): void;

  /** Reloads the current page. Same as `webContents.reload`. */
  reload(): void;

  /**
   * Removes a view added with `addBrowserView` or `setBrowserView`.
   *
   * @param browserView - The view to remove.
   */
  removeBrowserView(browserView: ElectronBrowserView): void;

  /**
   * Removes a listener for the given window event.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This BrowserWindow instance.
   */
  removeListener(event: 'always-on-top-changed', listener: (event: ElectronEvent, isAlwaysOnTop: boolean) => void): this;
  /** */
  removeListener(event: 'app-command', listener: (event: ElectronEvent, command: string) => void): this;
  /** */
  removeListener(event: 'blur', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'close', listener: (event: ElectronEvent) => void): this;
  /** */
  removeListener(event: 'closed', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'enter-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'enter-html-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'focus', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'hide', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'leave-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'leave-html-full-screen', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'maximize', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'minimize', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'move', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'moved', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'new-window-for-tab', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'page-title-updated', listener: (event: ElectronEvent, title: string, explicitSet: boolean) => void): this;
  /** */
  removeListener(event: 'ready-to-show', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'resize', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'resized', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'responsive', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'restore', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'rotate-gesture', listener: (event: ElectronEvent, rotation: number) => void): this;
  /** */
  removeListener(event: 'scroll-touch-begin', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'scroll-touch-edge', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'scroll-touch-end', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'session-end', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'sheet-begin', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'sheet-end', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'show', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'swipe', listener: (event: ElectronEvent, direction: string) => void): this;
  /** */
  removeListener(event: 'system-context-menu', listener: (event: ElectronEvent, point: ElectronPoint) => void): this;
  /** */
  removeListener(event: 'unmaximize', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'unresponsive', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'will-move', listener: (event: ElectronEvent, newBounds: ElectronRectangle) => void): this;
  /** */
  removeListener(event: 'will-resize', listener: (event: ElectronEvent, newBounds: ElectronRectangle, details: ElectronWillResizeDetails) => void): this;

  /** Removes the window's menu bar (Linux and Windows). */
  removeMenu(): void;

  /** Restores the window from minimized state to its previous state. */
  restore(): void;

  /** Selects the next tab when native tabs are enabled and there are other tabs in the window (macOS only). */
  selectNextTab(): void;

  /** Selects the previous tab when native tabs are enabled and there are other tabs in the window (macOS only). */
  selectPreviousTab(): void;

  /**
   * Sets whether the window should show always on top of other windows.
   *
   * @param flag - Whether to set always on top.
   * @param level - The always-on-top level (macOS only).
   * @param relativeLevel - The number of layers higher to set this window relative to the given `level`.
   */
  setAlwaysOnTop(flag: boolean, level?: 'floating' | 'main-menu' | 'modal-panel' | 'normal' | 'pop-up-menu' | 'screen-saver' | 'status' | 'torn-off-menu', relativeLevel?: number): void;

  /**
   * Sets the properties for the window's taskbar button (Windows only).
   *
   * @param options - The taskbar button properties.
   */
  setAppDetails(options: ElectronAppDetailsOptions): void;

  /**
   * Makes the window maintain an aspect ratio.
   *
   * @param aspectRatio - The aspect ratio to maintain.
   * @param extraSize - Extra size not included within the aspect ratio calculations.
   */
  setAspectRatio(aspectRatio: number, extraSize?: ElectronSize): void;

  /**
   * Controls whether to hide the cursor when typing (macOS only).
   *
   * @param autoHide - Whether to auto-hide the cursor.
   */
  setAutoHideCursor(autoHide: boolean): void;

  /**
   * Sets whether the window menu bar should hide itself automatically.
   *
   * @param hide - Whether to auto-hide the menu bar.
   */
  setAutoHideMenuBar(hide: boolean): void;

  /**
   * Sets the background color of the window.
   *
   * @param backgroundColor - The CSS color value.
   */
  setBackgroundColor(backgroundColor: string): void;

  /**
   * Resizes and moves the window to the supplied bounds. Any properties not supplied default to their current values.
   *
   * @param bounds - The new bounds.
   * @param animate - Whether to animate the transition.
   */
  setBounds(bounds: Partial<ElectronRectangle>, animate?: boolean): void;

  /**
   * Sets the view attached to the window.
   *
   * @param browserView - The view to attach, or `null` to detach.
   */
  setBrowserView(browserView: ElectronBrowserView | null): void;

  /**
   * Sets whether the window can be manually closed by user. On Linux does nothing (macOS and Windows).
   *
   * @param closable - Whether the window is closable.
   */
  setClosable(closable: boolean): void;

  /**
   * Resizes and moves the window's client area to the supplied bounds.
   *
   * @param bounds - The new content bounds.
   * @param animate - Whether to animate the transition.
   */
  setContentBounds(bounds: ElectronRectangle, animate?: boolean): void;

  /**
   * Prevents the window contents from being captured by other apps (macOS and Windows).
   *
   * @param enable - Whether to enable content protection.
   */
  setContentProtection(enable: boolean): void;

  /**
   * Resizes the window's client area to `width` and `height`.
   *
   * @param width - The new width.
   * @param height - The new height.
   * @param animate - Whether to animate the transition.
   */
  setContentSize(width: number, height: number, animate?: boolean): void;

  /**
   * Specifies whether the window's document has been edited (macOS only).
   *
   * @param edited - Whether the document has been edited.
   */
  setDocumentEdited(edited: boolean): void;

  /**
   * Disables or enables the window.
   *
   * @param enable - Whether to enable the window.
   */
  setEnabled(enable: boolean): void;

  /**
   * Changes whether the window can be focused (macOS and Windows).
   *
   * @param focusable - Whether the window is focusable.
   */
  setFocusable(focusable: boolean): void;

  /**
   * Sets whether the window should be in fullscreen mode.
   *
   * @param flag - Whether to enable fullscreen.
   */
  setFullScreen(flag: boolean): void;

  /**
   * Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.
   *
   * @param fullscreenable - Whether the window is fullscreenable.
   */
  setFullScreenable(fullscreenable: boolean): void;

  /**
   * Sets whether the window should have a shadow.
   *
   * @param hasShadow - Whether the window should have a shadow.
   */
  setHasShadow(hasShadow: boolean): void;

  /**
   * Changes the window icon (Linux and Windows).
   *
   * @param icon - The icon image or path.
   */
  setIcon(icon: ElectronNativeImage | string): void;

  /**
   * Makes the window ignore all mouse events.
   *
   * @param ignore - Whether to ignore mouse events.
   * @param options - Additional options.
   */
  setIgnoreMouseEvents(ignore: boolean, options?: ElectronIgnoreMouseEventsOptions): void;

  /**
   * Enters or leaves kiosk mode.
   *
   * @param flag - Whether to enable kiosk mode.
   */
  setKiosk(flag: boolean): void;

  /**
   * Sets whether the window can be manually maximized by user. On Linux does nothing (macOS and Windows).
   *
   * @param maximizable - Whether the window is maximizable.
   */
  setMaximizable(maximizable: boolean): void;

  /**
   * Sets the maximum size of the window.
   *
   * @param width - The maximum width.
   * @param height - The maximum height.
   */
  setMaximumSize(width: number, height: number): void;

  /**
   * Sets the menu as the window's menu bar (Linux and Windows).
   *
   * @param menu - The menu to set, or `null` to remove it.
   */
  setMenu(menu: ElectronMenu | null): void;

  /**
   * Sets whether the menu bar should be visible (Linux and Windows).
   *
   * @param visible - Whether the menu bar is visible.
   */
  setMenuBarVisibility(visible: boolean): void;

  /**
   * Sets whether the window can be manually minimized by user. On Linux does nothing (macOS and Windows).
   *
   * @param minimizable - Whether the window is minimizable.
   */
  setMinimizable(minimizable: boolean): void;

  /**
   * Sets the minimum size of the window.
   *
   * @param width - The minimum width.
   * @param height - The minimum height.
   */
  setMinimumSize(width: number, height: number): void;

  /**
   * Sets whether the window can be moved by user. On Linux does nothing (macOS and Windows).
   *
   * @param movable - Whether the window is movable.
   */
  setMovable(movable: boolean): void;

  /**
   * Sets the opacity of the window. On Linux, does nothing. Out of bound values are clamped to the `[0, 1]` range.
   *
   * @param opacity - The opacity value between `0.0` and `1.0`.
   */
  setOpacity(opacity: number): void;

  /**
   * Sets a 16 x 16 pixel overlay onto the current taskbar icon (Windows only).
   *
   * @param overlay - The overlay image, or `null` to remove the overlay.
   * @param description - A description of the overlay for accessibility tools.
   */
  setOverlayIcon(overlay: ElectronNativeImage | null, description: string): void;

  /**
   * Sets the parent window. Passing `null` will turn the current window into a top-level window.
   *
   * @param parent - The new parent window, or `null`.
   */
  setParentWindow(parent: ElectronBrowserWindow | null): void;

  /**
   * Moves the window to `x` and `y`.
   *
   * @param x - The x coordinate.
   * @param y - The y coordinate.
   * @param animate - Whether to animate the transition.
   */
  setPosition(x: number, y: number, animate?: boolean): void;

  /**
   * Sets the progress value in the progress bar. Valid range is `[0, 1.0]`.
   *
   * @param progress - The progress value.
   * @param options - Additional options.
   */
  setProgressBar(progress: number, options?: ElectronProgressBarOptions): void;

  /**
   * Sets the pathname of the file the window represents (macOS only).
   *
   * @param filename - The represented filename.
   */
  setRepresentedFilename(filename: string): void;

  /**
   * Sets whether the window can be manually resized by user.
   *
   * @param resizable - Whether the window is resizable.
   */
  setResizable(resizable: boolean): void;

  /**
   * Sets a window shape determining the area within the window where drawing and user interaction are permitted
   * (Linux and Windows).
   *
   * @param rects - The rectangles defining the window shape.
   */
  setShape(rects: ElectronRectangle[]): void;

  /**
   * Changes the attachment point for sheets on macOS (macOS only).
   *
   * @param offsetY - The vertical offset.
   * @param offsetX - The horizontal offset.
   */
  setSheetOffset(offsetY: number, offsetX?: number): void;

  /**
   * Enters or leaves simple fullscreen mode (macOS only).
   *
   * @param flag - Whether to enable simple fullscreen mode.
   */
  setSimpleFullScreen(flag: boolean): void;

  /**
   * Resizes the window to `width` and `height`.
   *
   * @param width - The new width.
   * @param height - The new height.
   * @param animate - Whether to animate the transition.
   */
  setSize(width: number, height: number, animate?: boolean): void;

  /**
   * Makes the window not show in the taskbar.
   *
   * @param skip - Whether to skip the taskbar.
   */
  setSkipTaskbar(skip: boolean): void;

  /**
   * Adds a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window (Windows only).
   *
   * @param buttons - The buttons to add.
   * @returns Whether the buttons were added successfully.
   */
  setThumbarButtons(buttons: ElectronThumbarButton[]): boolean;

  /**
   * Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the
   * taskbar (Windows only).
   *
   * @param region - The region to show as the thumbnail.
   */
  setThumbnailClip(region: ElectronRectangle): void;

  /**
   * Sets the tooltip displayed when hovering over the window thumbnail in the taskbar (Windows only).
   *
   * @param toolTip - The tooltip text.
   */
  setThumbnailToolTip(toolTip: string): void;

  /**
   * Changes the title of the native window.
   *
   * @param title - The new title.
   */
  setTitle(title: string): void;

  /**
   * On a window with Window Controls Overlay already enabled, updates the style of the title bar overlay
   * (Windows only).
   *
   * @param options - The title bar overlay style.
   */
  setTitleBarOverlay(options: ElectronTitleBarOverlayOptions): void;

  /**
   * Raises `browserView` above other views attached to the window.
   *
   * @param browserView - The view to raise.
   */
  setTopBrowserView(browserView: ElectronBrowserView): void;

  /**
   * Sets the touch bar layout for the current window. Specifying `null` or `undefined` clears the touch bar
   * (macOS only).
   *
   * @param touchBar - The touch bar, or `null` to clear it.
   */
  setTouchBar(touchBar: ElectronTouchBar | null): void;

  /**
   * Sets a custom position for the traffic light buttons in a frameless window (macOS only).
   *
   * @param position - The traffic light position.
   */
  setTrafficLightPosition(position: ElectronPoint): void;

  /**
   * Adds a vibrancy effect to the browser window. Passing `null` or an empty string removes the effect (macOS only).
   *
   * @param type - The vibrancy type, or `null` to remove the effect.
   */
  setVibrancy(type: 'appearance-based' | 'content' | 'dark' | 'fullscreen-ui' | 'header' | 'hud' | 'light' | 'medium-light' | 'menu' | 'popover' | 'selection' | 'sheet' | 'sidebar' | 'titlebar' | 'tooltip' | 'ultra-dark' | 'under-page' | 'under-window' | 'window' | null): void;

  /**
   * Sets whether the window should be visible on all workspaces. Does nothing on Windows.
   *
   * @param visible - Whether the window is visible on all workspaces.
   * @param options - Additional options.
   */
  setVisibleOnAllWorkspaces(visible: boolean, options?: ElectronVisibleOnAllWorkspacesOptions): void;

  /**
   * Sets whether the window traffic light buttons should be visible (macOS only).
   *
   * @param visible - Whether the traffic light buttons are visible.
   */
  setWindowButtonVisibility(visible: boolean): void;

  /** Shows and gives focus to the window. */
  show(): void;

  /** Shows the definition for the selected word (macOS only). Same as `webContents.showDefinitionForSelection()`. */
  showDefinitionForSelection(): void;

  /** Shows the window but doesn't focus on it. */
  showInactive(): void;

  /** Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab (macOS only). */
  toggleTabBar(): void;

  /** Unhooks all of the window messages (Windows only). */
  unhookAllWindowMessages(): void;

  /**
   * Unhooks the window message (Windows only).
   *
   * @param message - The message identifier.
   */
  unhookWindowMessage(message: number): void;

  /** Unmaximizes the window. */
  unmaximize(): void;
}
