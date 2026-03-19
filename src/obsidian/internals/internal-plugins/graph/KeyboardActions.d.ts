/**
 * Keyboard actions.
 *
 * @public
 * @unofficial
 */
export interface KeyboardActions {
  /** Whether the down arrow key is currently pressed. */
  down?: boolean;

  /** Whether the left arrow key is currently pressed. */
  left?: boolean;

  /** Whether the right arrow key is currently pressed. */
  right?: boolean;

  /** Whether the shift key is currently pressed. */
  shift?: boolean;

  /** Whether the up arrow key is currently pressed. */
  up?: boolean;

  /** Whether the zoom-in key is currently pressed. */
  zoomin?: boolean;

  /** Whether the zoom-out key is currently pressed. */
  zoomout?: boolean;
}
