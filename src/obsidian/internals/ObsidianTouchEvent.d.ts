/** @todo Documentation incomplete */
/** @public */
export interface ObsidianTouchEvent {
    direction: 'x' | 'y';
    evt: TouchEvent;
    points: number;
    registerCallback: {
        move: (x: number) => void;
        cancel: () => void;
        finish: (x: number, y: number, z: number) => void;
    };
    startX: number;
    startY: number;
    targetEl: HTMLElement;
    touch: Touch;
    x: number;
    y: number;
}
