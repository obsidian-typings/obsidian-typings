import type { ElectronAutoResizeOptions } from './ElectronAutoResizeOptions.d.ts';
import type { ElectronBrowserViewConstructorOptions } from './ElectronBrowserViewConstructorOptions.d.ts';
import type { ElectronRectangle } from './ElectronRectangle.d.ts';
import type { ElectronWebContents } from './ElectronWebContents.d.ts';

/**
 * Electron BrowserView for embedding additional web content in a {@link ElectronBrowserWindow}.
 *
 * @public
 * @unofficial
 */
export declare class ElectronBrowserView {
  /** The web contents owned by this view. */
  webContents: ElectronWebContents;

  /**
   * Create new instance of {@link ElectronBrowserView}.
   *
   * @param options - Options.
   */
  constructor(options?: ElectronBrowserViewConstructorOptions);

  /**
   * Returns the bounds of this view.
   *
   * @returns The view bounds.
   */
  getBounds(): ElectronRectangle;

  /**
   * Configures how the view auto-resizes with its window.
   *
   * @param options - The auto-resize options.
   */
  setAutoResize(options: ElectronAutoResizeOptions): void;

  /**
   * Sets the background color of the view.
   *
   * @param color - The CSS color value.
   */
  setBackgroundColor(color: string): void;

  /**
   * Resizes and moves the view to the supplied bounds relative to the window.
   *
   * @param bounds - The new bounds.
   */
  setBounds(bounds: ElectronRectangle): void;
}
