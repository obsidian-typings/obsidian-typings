import type { PublishFileTreeItem } from './PublishFileTreeItem.d.ts';
import type { PublishPluginInstance } from './PublishPluginInstance.d.ts';

/**
 * One collapsible file list in the Publish changes dialog: changed, unchanged or new files.
 *
 * @public
 * @unofficial
 */
export interface PublishFileListSection {
  /** The element holding the rows. */
  childrenEl: HTMLElement;

  /** Whether the list is collapsed. */
  collapsed: boolean;

  /** The file rows, keyed by vault path. */
  files: Record<string, PublishFileTreeItem>;

  /** The list's header element. */
  headerEl: HTMLElement;

  /** The Publish plugin instance. */
  publish: PublishPluginInstance;

  /** The list's root element. */
  sectionEl: HTMLElement;

  /** Select every change in the list. */
  checkAll(): void;

  /** Remove every row. */
  clear(): void;

  /** Deselect every change in the list. */
  uncheckAll(): void;
}
