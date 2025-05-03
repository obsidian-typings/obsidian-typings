/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface ObsidianTouchEventRegisterCallback {
    /** @todo Documentation incomplete. */
    cancel(): void;

    /** @todo Documentation incomplete. */
    finish(x: number, y: number, z: number): void;

    /** @todo Documentation incomplete. */
    move(x: number): void;
}
