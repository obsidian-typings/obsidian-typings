import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronWebContents } from './ElectronWebContents.d.ts';
import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * Event passed as the first argument to `ipcMain` `handle`/`handleOnce` handlers.
 *
 * @public
 * @unofficial
 */
export interface ElectronIpcMainInvokeEvent extends ElectronEvent {
  /** The ID of the renderer frame that sent this message. */
  frameId: number;

  /** The internal ID of the renderer process that sent this message. */
  processId: number;

  /** The `webContents` that sent the message. */
  sender: ElectronWebContents;

  /** The frame that sent this message. */
  readonly senderFrame: ElectronWebFrameMain;
}
