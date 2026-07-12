import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronSaveDialogOptions } from './ElectronSaveDialogOptions.d.ts';

/**
 * Controls and reports on a file download in a session.
 *
 * @public
 * @unofficial
 */
export interface ElectronDownloadItem {
  /** The save file path of the download item. Only settable in the session's `will-download` callback. */
  savePath: string;

  /**
   * Registers a listener for the `done` event, emitted when the download reaches a terminal state.
   *
   * @param event - The event name.
   * @param listener - Called with the terminal state of the download.
   * @returns This download item instance.
   */
  addListener(event: 'done', listener: (event: ElectronEvent, state: 'cancelled' | 'completed' | 'interrupted') => void): this;

  /**
   * Registers a listener for the `updated` event, emitted when the download has been updated and is not done.
   *
   * @param event - The event name.
   * @param listener - Called with the current state of the download.
   * @returns This download item instance.
   */
  addListener(event: 'updated', listener: (event: ElectronEvent, state: 'interrupted' | 'progressing') => void): this;

  /** Cancels the download operation. */
  cancel(): void;

  /**
   * Returns whether the download can resume.
   *
   * @returns Whether the download can resume.
   */
  canResume(): boolean;

  /**
   * Returns the `Content-Disposition` field from the response header.
   *
   * @returns The content disposition.
   */
  getContentDisposition(): string;

  /**
   * Returns the `ETag` header value.
   *
   * @returns The ETag value.
   */
  getETag(): string;

  /**
   * Returns the file name of the download item.
   *
   * @returns The file name.
   */
  getFilename(): string;

  /**
   * Returns the `Last-Modified` header value.
   *
   * @returns The last modified time.
   */
  getLastModifiedTime(): string;

  /**
   * Returns the file's MIME type.
   *
   * @returns The MIME type.
   */
  getMimeType(): string;

  /**
   * Returns the received bytes of the download item.
   *
   * @returns The number of received bytes.
   */
  getReceivedBytes(): number;

  /**
   * Returns the object previously set by `setSaveDialogOptions`.
   *
   * @returns The save dialog options.
   */
  getSaveDialogOptions(): ElectronSaveDialogOptions;

  /**
   * Returns the save path of the download item.
   *
   * @returns The save path.
   */
  getSavePath(): string;

  /**
   * Returns the number of seconds since the UNIX epoch when the download was started.
   *
   * @returns The start time in seconds.
   */
  getStartTime(): number;

  /**
   * Returns the current state of the download.
   *
   * @returns The current state.
   */
  getState(): 'cancelled' | 'completed' | 'interrupted' | 'progressing';

  /**
   * Returns the total size in bytes of the download item. Returns 0 if the size is unknown.
   *
   * @returns The total number of bytes.
   */
  getTotalBytes(): number;

  /**
   * Returns the origin URL where the item is downloaded from.
   *
   * @returns The origin URL.
   */
  getURL(): string;

  /**
   * Returns the complete URL chain of the item including any redirects.
   *
   * @returns The URL chain.
   */
  getURLChain(): string[];

  /**
   * Returns whether the download has a user gesture.
   *
   * @returns Whether the download has a user gesture.
   */
  hasUserGesture(): boolean;

  /**
   * Returns whether the download is paused.
   *
   * @returns Whether the download is paused.
   */
  isPaused(): boolean;

  /**
   * Registers a listener for the `done` event, emitted when the download reaches a terminal state.
   *
   * @param event - The event name.
   * @param listener - Called with the terminal state of the download.
   * @returns This download item instance.
   */
  on(event: 'done', listener: (event: ElectronEvent, state: 'cancelled' | 'completed' | 'interrupted') => void): this;

  /**
   * Registers a listener for the `updated` event, emitted when the download has been updated and is not done.
   *
   * @param event - The event name.
   * @param listener - Called with the current state of the download.
   * @returns This download item instance.
   */
  on(event: 'updated', listener: (event: ElectronEvent, state: 'interrupted' | 'progressing') => void): this;

  /**
   * Registers a one-time listener for the `done` event.
   *
   * @param event - The event name.
   * @param listener - Called with the terminal state of the download.
   * @returns This download item instance.
   */
  once(event: 'done', listener: (event: ElectronEvent, state: 'cancelled' | 'completed' | 'interrupted') => void): this;

  /**
   * Registers a one-time listener for the `updated` event.
   *
   * @param event - The event name.
   * @param listener - Called with the current state of the download.
   * @returns This download item instance.
   */
  once(event: 'updated', listener: (event: ElectronEvent, state: 'interrupted' | 'progressing') => void): this;

  /** Pauses the download. */
  pause(): void;

  /**
   * Removes a previously registered `done` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This download item instance.
   */
  removeListener(event: 'done', listener: (event: ElectronEvent, state: 'cancelled' | 'completed' | 'interrupted') => void): this;

  /**
   * Removes a previously registered `updated` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This download item instance.
   */
  removeListener(event: 'updated', listener: (event: ElectronEvent, state: 'interrupted' | 'progressing') => void): this;

  /** Resumes the download that has been paused. */
  resume(): void;

  /**
   * Sets custom options for the save dialog. Only available in the session's `will-download` callback.
   *
   * @param options - The save dialog options.
   */
  setSaveDialogOptions(options: ElectronSaveDialogOptions): void;

  /**
   * Sets the save path of the download item. Only available in the session's `will-download` callback.
   *
   * @param path - The save path.
   */
  setSavePath(path: string): void;
}
