import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronMessagePortMain } from './ElectronMessagePortMain.d.ts';
import type { ElectronWebContents } from './ElectronWebContents.d.ts';
import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * Event passed as the first argument to `ipcMain` `on`/`once` listeners.
 *
 * @public
 * @unofficial
 */
export interface ElectronIpcMainEvent extends ElectronEvent {
  /** The ID of the renderer frame that sent this message. */
  frameId: number;

  /** A list of message ports that were transferred with this message. */
  ports: ElectronMessagePortMain[];

  /** The internal ID of the renderer process that sent this message. */
  processId: number;

  /** Set this to the value to be returned in a synchronous message. */
  returnValue: unknown;

  /** The `webContents` that sent the message. */
  sender: ElectronWebContents;

  /** The frame that sent this message. */
  readonly senderFrame: ElectronWebFrameMain;

  /**
   * Sends an IPC message to the renderer frame that sent the original message that is currently being handled.
   * Use this method to "reply" to the sent message in order to guarantee the reply goes to the correct process and frame.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send back to the renderer frame.
   */
  reply(channel: string, ...args: unknown[]): void;
}
