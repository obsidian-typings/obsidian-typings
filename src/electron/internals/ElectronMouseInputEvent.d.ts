/**
 * Mouse input event passed to {@link ElectronWebContents.sendInputEvent} to inject a trusted pointer
 * move.
 *
 * @public
 * @unofficial
 */
export interface ElectronMouseInputEvent {
  /** The modifier keys to hold, using Electron's lowercase names (e.g. `'control'`, `'shift'`, `'meta'`). */
  modifiers?: string[];

  /** The type of the mouse event. */
  type: 'mouseMove';

  /** The x coordinate (web-contents DIP) of the pointer. */
  x: number;

  /** The y coordinate (web-contents DIP) of the pointer. */
  y: number;
}
