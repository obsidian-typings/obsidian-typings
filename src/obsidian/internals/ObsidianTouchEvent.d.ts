import type { ObsidianTouchEventRegisterCallback } from './ObsidianTouchEventRegisterCallback.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface ObsidianTouchEvent {
    /** @todo Documentation incomplete. */
    direction: 'x' | 'y';

    /** @todo Documentation incomplete. */
    evt: TouchEvent;

    /** @todo Documentation incomplete. */
    points: number;

    /** @todo Documentation incomplete. */
    registerCallback: ObsidianTouchEventRegisterCallback;

    /** @todo Documentation incomplete. */
    startX: number;

    /** @todo Documentation incomplete. */
    startY: number;

    /** @todo Documentation incomplete. */
    targetEl: HTMLElement;

    /** @todo Documentation incomplete. */
    touch: Touch;

    /** @todo Documentation incomplete. */
    x: number;

    /** @todo Documentation incomplete. */
    y: number;
}
