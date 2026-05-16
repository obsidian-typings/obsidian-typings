import type { IpcRendererEvent } from './IpcRendererEvent.d.ts';

/**
 * Electron IPC renderer for communicating with the main process.
 *
 * @public
 * @unofficial
 */
export interface ElectronIpcRenderer {
  /**
   * Sends an asynchronous message to the main process and returns a promise with the reply.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   * @returns The reply from the main process.
   */
  invoke(channel: string, ...args: unknown[]): Promise<unknown>;

  /**
   * Listens for messages on the specified channel.
   *
   * @param channel - The IPC channel name.
   * @param listener - Callback invoked when a message is received.
   * @returns This IpcRenderer instance.
   */
  on(channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void): this;

  /**
   * Listens for a single message on the specified channel.
   *
   * @param channel - The IPC channel name.
   * @param listener - Callback invoked when a message is received.
   * @returns This IpcRenderer instance.
   */
  once(channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void): this;

  /**
   * Posts a message to the main process with optional transferable objects.
   *
   * @param channel - The IPC channel name.
   * @param message - The message to send.
   * @param transfer - Optional transferable MessagePort objects.
   */
  postMessage(channel: string, message: unknown, transfer?: MessagePort[]): void;

  /**
   * Removes all listeners for the specified channel.
   *
   * @param channel - The IPC channel name.
   * @returns This IpcRenderer instance.
   */
  removeAllListeners(channel?: string): this;

  /**
   * Removes a specific listener from the specified channel.
   *
   * @param channel - The IPC channel name.
   * @param listener - The listener to remove.
   * @returns This IpcRenderer instance.
   */
  removeListener(channel: string, listener: (...args: unknown[]) => void): this;

  /**
   * Sends an asynchronous message to the main process.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   */
  send(channel: string, ...args: unknown[]): void;

  /**
   * Sends a synchronous message to the main process and returns the reply.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   * @returns The synchronous reply from the main process.
   */
  sendSync(channel: string, ...args: unknown[]): unknown;

  /**
   * Sends a message to the host page of the webview.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   */
  sendToHost(channel: string, ...args: unknown[]): void;
}
