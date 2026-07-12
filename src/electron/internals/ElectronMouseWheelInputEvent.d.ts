import type { ElectronMouseInputEvent } from './ElectronMouseInputEvent.d.ts';

/**
 * Mouse wheel input event passed to {@link ElectronWebContents.sendInputEvent} to inject a trusted
 * scroll.
 *
 * @public
 * @unofficial
 */
export interface ElectronMouseWheelInputEvent extends ElectronMouseInputEvent {
  /** The acceleration ratio along the x axis. */
  accelerationRatioX?: number;

  /** The acceleration ratio along the y axis. */
  accelerationRatioY?: number;

  /** Whether the wheel event can trigger scrolling. */
  canScroll?: boolean;

  /** The scroll delta along the x axis. */
  deltaX?: number;

  /** The scroll delta along the y axis. */
  deltaY?: number;

  /** Whether the event carries precise scrolling deltas. */
  hasPreciseScrollingDeltas?: boolean;

  /** The type of the mouse wheel event. */
  type: 'mouseWheel';

  /** The number of wheel ticks along the x axis. */
  wheelTicksX?: number;

  /** The number of wheel ticks along the y axis. */
  wheelTicksY?: number;
}
