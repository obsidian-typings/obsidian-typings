import type { TreeItem } from '../../tree/TreeItem.d.ts';
import type { PublishFileDiff } from './PublishFileDiff.d.ts';
import type { PublishFileListSection } from './PublishFileListSection.d.ts';

/**
 * A file row in one of the Publish changes dialog's file lists.
 *
 * @public
 * @unofficial
 */
export interface PublishFileTreeItem extends TreeItem {
  /** The checkbox that selects the change. */
  checkboxEl: HTMLInputElement;

  /** The change the row shows. */
  diff: PublishFileDiff;

  /** The displayed name: the file name, without the extension for a note. */
  name: string;

  /** The vault path. */
  path: string;

  /** The file list holding the row. */
  section: PublishFileListSection;

  /**
   * Select or deselect the change.
   *
   * @param checked - Whether to select it.
   */
  setChecked(checked: boolean): void;
}
