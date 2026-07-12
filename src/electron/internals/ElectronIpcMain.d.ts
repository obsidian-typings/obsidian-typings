import type { ElectronIpcMainEvent } from './ElectronIpcMainEvent.d.ts';
import type { ElectronIpcMainInvokeEvent } from './ElectronIpcMainInvokeEvent.d.ts';

/**
 * Electron IPC main for communicating with renderer processes from the main process.
 *
 * @public
 * @unofficial
 */
export interface ElectronIpcMain extends NodeJS.EventEmitter {
  /**
   * Adds a handler for an `invoke`able IPC. This handler is called whenever a renderer calls
   * `ipcRenderer.invoke(channel, ...args)`.
   *
   * If `listener` returns a `Promise`, the eventual result of the promise is returned as a reply to the remote
   * caller. Otherwise, the return value of the listener is used as the value of the reply.
   *
   * The `event` passed as the first argument to the handler is the same as that passed to a regular event
   * listener. It includes information about which `WebContents` is the source of the invoke request.
   *
   * @param channel - The IPC channel name.
   * @param listener - Callback invoked to handle the message.
   */
  handle(channel: string, listener: (event: ElectronIpcMainInvokeEvent, ...args: unknown[]) => unknown): void;

  /**
   * Handles a single `invoke`able IPC message, then removes the listener. See `ipcMain.handle(channel, listener)`.
   *
   * @param channel - The IPC channel name.
   * @param listener - Callback invoked to handle the message.
   */
  handleOnce(channel: string, listener: (event: ElectronIpcMainInvokeEvent, ...args: unknown[]) => unknown): void;

  /**
   * Listens to `channel`; when a new message arrives `listener` is called with `listener(event, args...)`.
   *
   * @param channel - The IPC channel name.
   * @param listener - Callback invoked when a message is received.
   * @returns This `IpcMain` instance.
   */
  on(channel: string, listener: (event: ElectronIpcMainEvent, ...args: unknown[]) => void): this;

  /**
   * Adds a one-time `listener` function for the event, invoked only the next time a message is sent to
   * `channel`, after which it is removed.
   *
   * @param channel - The IPC channel name.
   * @param listener - Callback invoked when a message is received.
   * @returns This `IpcMain` instance.
   */
  once(channel: string, listener: (event: ElectronIpcMainEvent, ...args: unknown[]) => void): this;

  /**
   * Removes listeners of the specified `channel`.
   *
   * @param channel - The IPC channel name.
   * @returns This `IpcMain` instance.
   */
  removeAllListeners(channel?: string): this;

  /**
   * Removes any handler for `channel`, if present.
   *
   * @param channel - The IPC channel name.
   */
  removeHandler(channel: string): void;

  /**
   * Removes the specified `listener` from the listener array for the specified `channel`.
   *
   * @param channel - The IPC channel name.
   * @param listener - The listener to remove.
   * @returns This `IpcMain` instance.
   */
  removeListener(channel: string, listener: (...args: unknown[]) => void): this;
}
