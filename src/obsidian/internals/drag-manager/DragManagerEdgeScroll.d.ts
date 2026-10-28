/**
 * State of the automatic scrolling that runs while a drag hovers near the edge of a scrollable element.
 *
 * @public
 * @unofficial
 */
export interface DragManagerEdgeScroll {
  /**
   * The direction the target element is being scrolled in.
   */
  dir: 'down' | 'left' | 'right' | 'up';

  /**
   * The handle of the pending animation frame that advances the scroll.
   */
  frame: number;

  /**
   * The scroll speed in pixels per millisecond, from `0` to `1`, growing as the pointer nears the edge.
   */
  speed: number;

  /**
   * The scrollable element being scrolled.
   */
  targetEl: Element;

  /**
   * The window whose animation frames drive the scroll.
   */
  win: Window;
}
