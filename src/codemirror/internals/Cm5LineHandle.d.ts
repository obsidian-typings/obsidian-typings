import type { Cm5EditorChange } from './Cm5EditorChange.d.ts';

/**
 * A handle to a line in a CodeMirror 5 document.
 *
 * @public
 * @unofficial
 */
export interface Cm5LineHandle {
  /** The text content of the line. */
  text: string;

  /**
   * Removes an event listener for the specified event.
   *
   * @param eventName - The event name.
   * @param handler - The handler to remove.
   */
  off(eventName: 'change', handler: (instance: Cm5LineHandle, changeObj: Cm5EditorChange) => void): void;
  /** Removes an event listener for the specified event. */
  off(eventName: 'delete', handler: () => void): void;

  /**
   * Registers an event listener for the specified event.
   *
   * @param eventName - The event name.
   * @param handler - The handler to register.
   */
  on(eventName: 'change', handler: (instance: Cm5LineHandle, changeObj: Cm5EditorChange) => void): void;
  /** Registers an event listener for the specified event. */
  on(eventName: 'delete', handler: () => void): void;
}
