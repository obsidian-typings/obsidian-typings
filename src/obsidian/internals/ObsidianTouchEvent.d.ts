import type { ObsidianTouchEventRegisterCallback } from './ObsidianTouchEventRegisterCallback.d.ts';

/** @todo Documentation incomplete */
/** @public */
export interface ObsidianTouchEvent {
    direction: 'x' | 'y';
    evt: TouchEvent;
    points: number;
    registerCallback: ObsidianTouchEventRegisterCallback;
    startX: number;
    startY: number;
    targetEl: HTMLElement;
    touch: Touch;
    x: number;
    y: number;
}
