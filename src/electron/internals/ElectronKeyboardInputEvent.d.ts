import type { ElectronInputEvent } from './ElectronInputEvent.d.ts';

/**
 * Keyboard input event passed to {@link ElectronWebContents.sendInputEvent} to inject a trusted key
 * press.
 *
 * @public
 * @unofficial
 */
export interface ElectronKeyboardInputEvent extends ElectronInputEvent {
  /** The character sent as the keyboard event; use a valid Electron Accelerator key code. */
  keyCode: string;

  /** The type of the keyboard event. */
  type: 'char' | 'keyDown' | 'keyUp';
}
