import type { ObsidianTouchEventRegisterCallback } from './ObsidianTouchEventRegisterCallback.d.ts';

/**
 * Represents a touch event processed by Obsidian's gesture system.
 * @public
 * @unofficial
 */
export interface ObsidianTouchEvent {
    /** Primary axis of the touch gesture. */
    direction: 'x' | 'y';

    /** The underlying browser touch event. */
    evt: TouchEvent;

    /** Number of touch points in the gesture. */
    points: number;

    /** Callbacks for managing the touch gesture lifecycle. */
    registerCallback: ObsidianTouchEventRegisterCallback;

    /** Starting X coordinate of the touch. */
    startX: number;

    /** Starting Y coordinate of the touch. */
    startY: number;

    /** Element that the touch event targets. */
    targetEl: HTMLElement;

    /** The primary Touch object from the event. */
    touch: Touch;

    /** Current X coordinate of the touch. */
    x: number;

    /** Current Y coordinate of the touch. */
    y: number;
}
