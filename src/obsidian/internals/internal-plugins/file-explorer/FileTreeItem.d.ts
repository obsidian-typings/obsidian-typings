import type { TFile } from 'obsidian';

import type { AbstractFileTreeItem } from './AbstractFileTreeItem.d.ts';

/**
 * Tree item representing a file in the file explorer.
 * @public
 * @unofficial
 */
export interface FileTreeItem extends AbstractFileTreeItem<TFile> {
  /**
   * Element that indicates associated file extension,
   * if it wasn't a Markdown file.
   */
  tagEl: HTMLElement | null;

  /**
   * Check whether the file type is supported for opening.
   *
   * @returns Whether the file type is supported.
   */
  isSupported(): boolean;
}
