import type { TextMarkerRange } from './TextMarkerRange.d.ts';

/**
 * A text marker in a CodeMirror 5 document.
 *
 * @public
 * @unofficial
 */
export interface TextMarker {
  /**
   * Fired when the marked range changes.
   */
  changed(): void;

  /**
   * Clears the marker.
   */
  clear(): void;

  /**
   * Finds the current position of the marker.
   *
   * @returns The marker's range, or `undefined` if the marker has been cleared.
   */
  find(): TextMarkerRange | undefined;

  /**
   * Removes an event listener.
   *
   * @param eventName - The event name.
   * @param handler - The handler to remove.
   */
  off(eventName: string, handler: (...args: unknown[]) => void): void;

  /**
   * Registers an event listener.
   *
   * @param eventName - The event name.
   * @param handler - The handler to register.
   */
  on(eventName: string, handler: (...args: unknown[]) => void): void;
}
