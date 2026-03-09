/**
 * Layout information for a tree node used by the virtual scrolling system.
 * @public
 * @unofficial
 */
export interface TreeNodeInfo {
  /** Left offset of child elements in pixels. */
  childLeft: number;

  /** Left padding applied to child elements in pixels. */
  childLeftPadding: number;

  /** Top offset of child elements in pixels. */
  childTop: number;

  /** Whether layout dimensions have been computed. */
  computed: boolean;

  /** Computed height of the node in pixels. */
  height: number;

  /** Whether the node is currently hidden from view. */
  hidden: boolean;

  /** Whether there is a next sibling node. */
  next: boolean;

  /** Whether a layout recomputation is queued. */
  queued: boolean;

  /** Computed width of the node in pixels. */
  width: number;
}
