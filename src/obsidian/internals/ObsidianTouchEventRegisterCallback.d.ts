/** @public */
export interface ObsidianTouchEventRegisterCallback {
    move(x: number): void;
    cancel(): void;
    finish(x: number, y: number, z: number): void;
}
