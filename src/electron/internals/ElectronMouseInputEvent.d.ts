import type { ElectronInputEvent } from './ElectronInputEvent.d.ts';

/**
 * Mouse input event passed to {@link ElectronWebContents.sendInputEvent} to inject a trusted pointer
 * event.
 *
 * @public
 * @unofficial
 */
export interface ElectronMouseInputEvent extends ElectronInputEvent {
  /** The button pressed. */
  button?: 'left' | 'middle' | 'right';

  /** The number of consecutive clicks. */
  clickCount?: number;

  /** The x coordinate of the pointer relative to the screen. */
  globalX?: number;

  /** The y coordinate of the pointer relative to the screen. */
  globalY?: number;

  /** The x movement delta since the previous mouse event. */
  movementX?: number;

  /** The y movement delta since the previous mouse event. */
  movementY?: number;

  /** The type of the mouse event. */
  type: 'contextMenu' | 'mouseDown' | 'mouseEnter' | 'mouseLeave' | 'mouseMove' | 'mouseUp' | 'mouseWheel';

  /** The x coordinate (web-contents DIP) of the pointer. */
  x: number;

  /** The y coordinate (web-contents DIP) of the pointer. */
  y: number;
}
