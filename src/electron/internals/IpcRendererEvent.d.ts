import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronIpcRenderer } from './ElectronIpcRenderer.d.ts';

/**
 * Event object passed to IPC renderer event listeners.
 *
 * @public
 * @unofficial
 */
export interface IpcRendererEvent extends ElectronEvent {
  /** A list of `MessagePort`s that were transferred with this message. */
  ports: MessagePort[];

  /** The `IpcRenderer` instance that emitted the event originally. */
  sender: ElectronIpcRenderer;

  /**
   * The `webContents.id` that sent the message. Call `event.sender.sendTo(event.senderId, ...)` to
   * reply to the message; this only applies to messages sent from a different renderer. Messages
   * sent directly from the main process set `senderId` to `0`.
   */
  senderId: number;
}
