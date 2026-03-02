/**
 * Callbacks for controlling a touch gesture's lifecycle.
 * @public
 * @unofficial
 */
export interface ObsidianTouchEventRegisterCallback {
    /** Cancel the current touch gesture. */
    cancel(): void;

    /** Complete the touch gesture with the final coordinates and velocity. */
    finish(x: number, y: number, z: number): void;

    /** Update the gesture with the current position during movement. */
    move(x: number): void;
}
