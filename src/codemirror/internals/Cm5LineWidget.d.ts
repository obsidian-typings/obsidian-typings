/**
 * A line widget in a CodeMirror 5 editor.
 *
 * @public
 * @unofficial
 */
export interface Cm5LineWidget {
  /**
   * Call this if you made some change to the widget's DOM node that might affect its height.
   */
  changed(): void;

  /**
   * Removes the widget.
   */
  clear(): void;

  /**
   * Removes an event listener.
   *
   * @param eventName - The event name.
   * @param handler - The handler to remove.
   */
  off(eventName: 'redraw', handler: () => void): void;

  /**
   * Registers an event listener.
   *
   * @param eventName - The event name.
   * @param handler - The handler to register.
   */
  on(eventName: 'redraw', handler: () => void): void;
}
