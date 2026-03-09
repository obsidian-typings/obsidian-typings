/**
 * Callbacks for controlling a touch gesture's lifecycle.
 * @public
 * @unofficial
 */
export interface ObsidianTouchEventRegisterCallback {
  /** Cancel the current touch gesture. */
  cancel(): void;

  /**
   * Complete the touch gesture with the final coordinates and velocity.
   *
   * @param x - The final X coordinate.
   * @param y - The final Y coordinate.
   * @param z - The velocity of the gesture.
   */
  finish(x: number, y: number, z: number): void;

  /**
   * Update the gesture with the current position during movement.
   *
   * @param x - The current X coordinate.
   */
  move(x: number): void;
}
