import type { TreeItem } from '../../tree/TreeItem.d.ts';
import type { SyncServerFile } from './SyncServerFile.d.ts';
import type { SyncView } from './SyncView.d.ts';

/**
 * A file row in the Sync history view.
 *
 * @public
 * @unofficial
 */
export interface SyncFileTreeItem extends TreeItem {
  /** The server file record the row shows. */
  sFile: SyncServerFile;

  /** The owning Sync history view. */
  view: SyncView;
}
