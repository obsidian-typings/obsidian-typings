import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronFeedURLOptions } from './ElectronFeedURLOptions.d.ts';

/**
 * Enables apps to automatically update themselves.
 *
 * @public
 * @unofficial
 */
export interface ElectronAutoUpdater extends NodeJS.EventEmitter {
  /**
   * Registers a listener for the given auto updater event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `AutoUpdater` instance.
   */
  addListener(event: 'before-quit-for-update', listener: (...args: unknown[]) => void): this;
  /** Registers a listener for the `checking-for-update` event. */
  addListener(event: 'checking-for-update', listener: (...args: unknown[]) => void): this;
  /** Registers a listener for the `error` event. */
  addListener(event: 'error', listener: (error: Error) => void): this;
  /** Registers a listener for the `update-available` event. */
  addListener(event: 'update-available', listener: (...args: unknown[]) => void): this;
  /** Registers a listener for the `update-downloaded` event. */
  addListener(event: 'update-downloaded', listener: (event: ElectronEvent, releaseNotes: string, releaseName: string, releaseDate: Date, updateURL: string) => void): this;
  /** Registers a listener for the `update-not-available` event. */
  addListener(event: 'update-not-available', listener: (...args: unknown[]) => void): this;

  /**
   * Asks the server whether there is an update. You must call `setFeedURL` before using this API.
   *
   * **Note:** If an update is available it will be downloaded automatically. Calling
   * `autoUpdater.checkForUpdates()` twice will download the update two times.
   */
  checkForUpdates(): void;

  /**
   * The current update feed URL.
   *
   * @returns The current update feed URL.
   */
  getFeedURL(): string;

  /**
   * Registers a listener for the given auto updater event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `AutoUpdater` instance.
   */
  on(event: 'before-quit-for-update', listener: (...args: unknown[]) => void): this;
  /** Registers a listener for the `checking-for-update` event. */
  on(event: 'checking-for-update', listener: (...args: unknown[]) => void): this;
  /** Registers a listener for the `error` event. */
  on(event: 'error', listener: (error: Error) => void): this;
  /** Registers a listener for the `update-available` event. */
  on(event: 'update-available', listener: (...args: unknown[]) => void): this;
  /** Registers a listener for the `update-downloaded` event. */
  on(event: 'update-downloaded', listener: (event: ElectronEvent, releaseNotes: string, releaseName: string, releaseDate: Date, updateURL: string) => void): this;
  /** Registers a listener for the `update-not-available` event. */
  on(event: 'update-not-available', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the given auto updater event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `AutoUpdater` instance.
   */
  once(event: 'before-quit-for-update', listener: (...args: unknown[]) => void): this;
  /** Registers a one-time listener for the `checking-for-update` event. */
  once(event: 'checking-for-update', listener: (...args: unknown[]) => void): this;
  /** Registers a one-time listener for the `error` event. */
  once(event: 'error', listener: (error: Error) => void): this;
  /** Registers a one-time listener for the `update-available` event. */
  once(event: 'update-available', listener: (...args: unknown[]) => void): this;
  /** Registers a one-time listener for the `update-downloaded` event. */
  once(event: 'update-downloaded', listener: (event: ElectronEvent, releaseNotes: string, releaseName: string, releaseDate: Date, updateURL: string) => void): this;
  /** Registers a one-time listener for the `update-not-available` event. */
  once(event: 'update-not-available', listener: (...args: unknown[]) => void): this;

  /**
   * Restarts the app and installs the update after it has been downloaded. It should only be called after
   * `update-downloaded` has been emitted.
   *
   * Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and
   * automatically call `app.quit()` after all windows have been closed.
   */
  quitAndInstall(): void;

  /**
   * Removes the given listener for the given auto updater event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `AutoUpdater` instance.
   */
  removeListener(event: 'before-quit-for-update', listener: (...args: unknown[]) => void): this;
  /** Removes the listener for the `checking-for-update` event. */
  removeListener(event: 'checking-for-update', listener: (...args: unknown[]) => void): this;
  /** Removes the listener for the `error` event. */
  removeListener(event: 'error', listener: (error: Error) => void): this;
  /** Removes the listener for the `update-available` event. */
  removeListener(event: 'update-available', listener: (...args: unknown[]) => void): this;
  /** Removes the listener for the `update-downloaded` event. */
  removeListener(event: 'update-downloaded', listener: (event: ElectronEvent, releaseNotes: string, releaseName: string, releaseDate: Date, updateURL: string) => void): this;
  /** Removes the listener for the `update-not-available` event. */
  removeListener(event: 'update-not-available', listener: (...args: unknown[]) => void): this;

  /**
   * Sets the `url` and initialize the auto updater.
   *
   * @param options - The feed URL options.
   */
  setFeedURL(options: ElectronFeedURLOptions): void;
}
