/**
 * Keyboard input event passed to {@link ElectronWebContents.sendInputEvent} to inject a trusted key
 * press.
 *
 * @public
 * @unofficial
 */
export interface ElectronKeyboardInputEvent {
  /** The key to send, given as an Electron Accelerator key name (e.g. `'Enter'`, `'a'`). */
  keyCode: string;

  /** The modifier keys to hold, using Electron's lowercase names (e.g. `'control'`, `'shift'`, `'meta'`). */
  modifiers?: string[];

  /** The type of the keyboard event. */
  type: 'char' | 'keyDown' | 'keyUp';
}
