import type { PaneType } from 'obsidian';

/**
 * Webviewer open URL event detail.
 * @public
 * @unofficial
 */
export interface WebviewerOpenUrlEventDetail {
  /**
   * Whether the URL is active.
   */
  active?: boolean;

  /**
   * The new leaf.
   */
  newLeaf?: PaneType | boolean;

  /**
   * The URL.
   */
  url: string;
}
