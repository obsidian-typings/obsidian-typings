import type { BrowserWindowConstructorOptions } from './BrowserWindowConstructorOptions.d.ts';
import type { ElectronRectangle } from './ElectronRectangle.d.ts';
import type { ElectronWebContents } from './ElectronWebContents.d.ts';

/**
 * Electron BrowserWindow for creating and managing application windows.
 *
 * @public
 * @unofficial
 */
export declare class ElectronBrowserWindow {
  /** The unique identifier for this window. */
  readonly id: number;

  /** The web contents associated with this window. */
  readonly webContents: ElectronWebContents;

  /** */
  constructor(options?: BrowserWindowConstructorOptions);

  /** Removes focus from the window. */
  blur(): void;

  /** Closes the window. */
  close(): void;

  /** Force-closes the window without firing close events. */
  destroy(): void;

  /** Focuses the window. */
  focus(): void;

  /**
   * Returns the BrowserWindow associated with the given id.
   *
   * @param id - The window id.
   * @returns The BrowserWindow or `null` if not found.
   */
  static fromId(id: number): ElectronBrowserWindow | null;

  /**
   * Returns the BrowserWindow that owns the given web contents.
   *
   * @param webContents - The web contents to look up.
   * @returns The BrowserWindow or `null` if not found.
   */
  static fromWebContents(webContents: ElectronWebContents): ElectronBrowserWindow | null;

  /**
   * Returns all open BrowserWindow instances.
   *
   * @returns An array of all BrowserWindow instances.
   */
  static getAllWindows(): ElectronBrowserWindow[];

  /**
   * Returns the bounds of the window.
   *
   * @returns The window bounds.
   */
  getBounds(): ElectronRectangle;

  /**
   * Returns the content area bounds of the window.
   *
   * @returns The content bounds.
   */
  getContentBounds(): ElectronRectangle;

  /**
   * Returns the currently focused BrowserWindow.
   *
   * @returns The focused BrowserWindow or `null` if none is focused.
   */
  static getFocusedWindow(): ElectronBrowserWindow | null;

  /**
   * Returns the position of the window.
   *
   * @returns A tuple of [x, y] coordinates.
   */
  getPosition(): [number, number];

  /**
   * Returns the size of the window.
   *
   * @returns A tuple of [width, height].
   */
  getSize(): [number, number];

  /**
   * Returns the title of the window.
   *
   * @returns The window title.
   */
  getTitle(): string;

  /** Hides the window. */
  hide(): void;

  /**
   * Returns whether the window is always on top of other windows.
   *
   * @returns Whether the window is always on top.
   */
  isAlwaysOnTop(): boolean;

  /**
   * Returns whether the window has been destroyed.
   *
   * @returns Whether the window is destroyed.
   */
  isDestroyed(): boolean;

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
   * Returns whether the window is maximized.
   *
   * @returns Whether the window is maximized.
   */
  isMaximized(): boolean;

  /**
   * Returns whether the window is minimized.
   *
   * @returns Whether the window is minimized.
   */
  isMinimized(): boolean;

  /**
   * Returns whether the window is visible.
   *
   * @returns Whether the window is visible.
   */
  isVisible(): boolean;

  /**
   * Loads a file into the window.
   *
   * @param filePath - The path to the file.
   * @param options - Options for loading the file.
   */
  loadFile(filePath: string, options?: { query?: Record<string, string>; search?: string; hash?: string }): Promise<void>;

  /**
   * Loads a URL into the window.
   *
   * @param url - The URL to load.
   * @param options - Options for loading the URL.
   */
  loadURL(url: string, options?: { httpReferrer?: string; userAgent?: string; extraHeaders?: string }): Promise<void>;

  /** Maximizes the window. */
  maximize(): void;

  /** Minimizes the window. */
  minimize(): void;

  /**
   * Registers an event listener on the window.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This BrowserWindow instance.
   */
  on(event: string, listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time event listener on the window.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This BrowserWindow instance.
   */
  once(event: string, listener: (...args: unknown[]) => void): this;

  /** Reloads the current page. */
  reload(): void;

  /**
   * Removes all listeners for the specified event.
   *
   * @param event - The event name.
   * @returns This BrowserWindow instance.
   */
  removeAllListeners(event?: string): this;

  /**
   * Removes a specific event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This BrowserWindow instance.
   */
  removeListener(event: string, listener: (...args: unknown[]) => void): this;

  /** Restores a minimized window. */
  restore(): void;

  /**
   * Sets whether the window should always be on top of other windows.
   *
   * @param flag - Whether to set always on top.
   */
  setAlwaysOnTop(flag: boolean): void;

  /**
   * Resizes and moves the window to the supplied bounds.
   *
   * @param bounds - The new bounds.
   * @param animate - Whether to animate the transition.
   */
  setBounds(bounds: Partial<ElectronRectangle>, animate?: boolean): void;

  /**
   * Resizes and moves the window's content area to the supplied bounds.
   *
   * @param bounds - The new content bounds.
   * @param animate - Whether to animate the transition.
   */
  setContentBounds(bounds: ElectronRectangle, animate?: boolean): void;

  /**
   * Sets the window to fullscreen mode.
   *
   * @param flag - Whether to enable fullscreen.
   */
  setFullScreen(flag: boolean): void;

  /**
   * Moves the window to the specified position.
   *
   * @param x - The x coordinate.
   * @param y - The y coordinate.
   * @param animate - Whether to animate the transition.
   */
  setPosition(x: number, y: number, animate?: boolean): void;

  /**
   * Resizes the window.
   *
   * @param width - The new width.
   * @param height - The new height.
   * @param animate - Whether to animate the transition.
   */
  setSize(width: number, height: number, animate?: boolean): void;

  /**
   * Sets the title of the window.
   *
   * @param title - The new title.
   */
  setTitle(title: string): void;

  /** Shows the window. */
  show(): void;

  /** Unmaximizes the window. */
  unmaximize(): void;
}
