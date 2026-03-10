import type { HoverParent } from 'obsidian';

import type { HoverLinkEventState } from './HoverLinkEventState.d.ts';

/**
 * Event triggered when a link is hovered.
 *
 * @public
 * @unofficial
 */
export interface HoverLinkEvent {
  /**
   * The mouse event.
   */
  event: MouseEvent;

  /**
   * The hover parent.
   */
  hoverParent: HoverParent;

  /**
   * The link text.
   */
  linktext: string;

  /**
   * The source of the event.
   */
  source: 'editor' | 'file-explorer' | 'graph' | 'hover-link' | 'preview' | 'properties' | 'search';

  /**
   * The source path.
   */
  sourcePath?: string;

  /**
   * The state of the event.
   */
  state?: HoverLinkEventState;

  /**
   * The target element.
   */
  targetEl: HTMLElement | null;
}
