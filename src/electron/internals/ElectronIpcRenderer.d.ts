import type { IpcRendererEvent } from './IpcRendererEvent.d.ts';

/**
 * Electron IPC renderer for communicating with the main process.
 *
 * @public
 * @unofficial
 */
export interface ElectronIpcRenderer extends NodeJS.EventEmitter {
  /**
   * Sends a message to the main process via `channel` and expects a result asynchronously.
   *
   * The main process should listen for `channel` with `ipcMain.handle()`. Arguments are serialized
   * with the Structured Clone Algorithm, so prototype chains are not included and sending functions,
   * promises, symbols, weak maps, or weak sets throws an exception.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   * @returns A promise resolving with the response from the main process.
   */
  invoke(channel: string, ...args: unknown[]): Promise<unknown>;

  /**
   * Listens to `channel`; when a new message arrives `listener` is called with `listener(event, args...)`.
   *
   * @param channel - The IPC channel name.
   * @param listener - Callback invoked when a message is received.
   * @returns This `IpcRenderer` instance.
   */
  on(channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void): this;

  /**
   * Adds a one-time `listener` function for the event, invoked only the next time a message is sent
   * to `channel`, after which it is removed.
   *
   * @param channel - The IPC channel name.
   * @param listener - Callback invoked when a message is received.
   * @returns This `IpcRenderer` instance.
   */
  once(channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void): this;

  /**
   * Sends a message to the main process, optionally transferring ownership of zero or more
   * `MessagePort` objects. The transferred ports are available in the main process as
   * `MessagePortMain` objects via the `ports` property of the emitted event.
   *
   * @param channel - The IPC channel name.
   * @param message - The message to send.
   * @param transfer - Optional transferable `MessagePort` objects.
   */
  postMessage(channel: string, message: unknown, transfer?: MessagePort[]): void;

  /**
   * Removes all listeners of the specified `channel`.
   *
   * @param channel - The IPC channel name.
   * @returns This `IpcRenderer` instance.
   */
  removeAllListeners(channel: string): this;

  /**
   * Removes the specified `listener` from the listener array for the specified `channel`.
   *
   * @param channel - The IPC channel name.
   * @param listener - The listener to remove.
   * @returns This `IpcRenderer` instance.
   */
  removeListener(channel: string, listener: (...args: unknown[]) => void): this;

  /**
   * Sends an asynchronous message to the main process via `channel`, along with arguments.
   *
   * The main process handles it by listening for `channel` with the `ipcMain` module. Arguments are
   * serialized with the Structured Clone Algorithm, so prototype chains are not included and sending
   * functions, promises, symbols, weak maps, or weak sets throws an exception.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   */
  send(channel: string, ...args: unknown[]): void;

  /**
   * Reads or sets Obsidian's "Command line interface" setting.
   *
   * @param channel - The `cli` channel of Obsidian's main process.
   * @param isEnabled - `true` or `false` to set the setting; anything else only reads it.
   * @returns Whether the setting is on, after applying `isEnabled`.
   */
  sendSync(channel: 'cli', isEnabled?: boolean | null): boolean;

  /**
   * Reads or sets Obsidian's "Hardware acceleration" setting, stored as its inverse.
   *
   * @param channel - The `disable-gpu` channel of Obsidian's main process.
   * @param isDisabled - `true` or `false` to set the setting; anything else only reads it.
   * @returns `true` when hardware acceleration is disabled, `undefined` when it is not. Never `false`, because
   * Obsidian deletes the stored flag rather than storing `false`.
   */
  sendSync(channel: 'disable-gpu', isDisabled?: boolean | null): true | undefined;

  /**
   * Reads or sets Obsidian's "Automatic updates" setting, stored as its inverse.
   *
   * @param channel - The `disable-update` channel of Obsidian's main process.
   * @param isDisabled - `true` or `false` to set the setting; anything else only reads it.
   * @returns `true` when automatic updates are disabled, `undefined` when they are not. Never `false`, because
   * Obsidian deletes the stored flag rather than storing `false`.
   */
  sendSync(channel: 'disable-update', isDisabled?: boolean | null): true | undefined;

  /**
   * Reads or sets Obsidian's "Receive early access versions" setting.
   *
   * @param channel - The `insider-build` channel of Obsidian's main process.
   * @param isEnabled - `true` or `false` to set the setting; anything else only reads it. `true` is ignored
   * where an organization policy (the `insider` key) forbids early access.
   * @returns Whether early access versions are received, after applying `isEnabled`.
   */
  sendSync(channel: 'insider-build', isEnabled?: boolean | null): boolean;

  /**
   * Sends a message to the main process via `channel` and expects a result synchronously.
   *
   * The main process handles it by listening for `channel` with the `ipcMain` module and replies by
   * setting `event.returnValue`. Sending a synchronous message blocks the whole renderer process
   * until the reply is received, so use this only as a last resort.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   * @returns The value sent back by the `ipcMain` handler.
   */
  sendSync(channel: string, ...args: unknown[]): unknown;

  /**
   * Sends a message to a window with `webContentsId` via `channel`.
   *
   * @param webContentsId - The `webContents.id` of the target window.
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   */
  sendTo(webContentsId: number, channel: string, ...args: unknown[]): void;

  /**
   * Like `send`, but the event is sent to the `<webview>` element in the host page instead of the
   * main process.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   */
  sendToHost(channel: string, ...args: unknown[]): void;
}
