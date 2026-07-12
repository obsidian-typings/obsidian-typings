/**
 * Electron event object passed to event listeners, extending the DOM `Event`.
 *
 * @public
 * @unofficial
 */
export interface ElectronEvent extends Event {
  /** Prevents the default action associated with the event. */
  preventDefault(): void;
}
