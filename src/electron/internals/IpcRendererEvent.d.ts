/**
 * Event object passed to IPC renderer event listeners.
 *
 * @public
 * @unofficial
 */
export interface IpcRendererEvent extends Event {
  /** Message ports transferred with the event. */
  ports: MessagePort[];
}
