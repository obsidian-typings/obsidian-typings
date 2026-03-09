/**
 * Result returned from a drop handler indicating the outcome of a drop operation.
 * @public
 * @unofficial
 */
export interface DropResult {
  /** Action identifier describing what happened on drop (e.g. "link", "move"). */
  action: string | null;

  /** The drop effect to apply to the drag event. */
  dropEffect: 'none' | 'copy' | 'link' | 'move';

  /** CSS class to apply to the hover target element. */
  hoverClass?: string;

  /** Element to highlight as the current drop target. */
  hoverEl?: HTMLElement | null;
}
