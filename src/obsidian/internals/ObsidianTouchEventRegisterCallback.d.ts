/** @public */
export interface ObsidianTouchEventRegisterCallback {
    cancel(): void;
    finish(x: number, y: number, z: number): void;
    move(x: number): void;
}
