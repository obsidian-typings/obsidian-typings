import type { TreeRoot } from '../../Tree/TreeRoot.d.ts';
import type { FileTreeItem } from './FileTreeItem.d.ts';
import type { FolderTreeItem } from './FolderTreeItem.d.ts';

/** @todo Documentation incomplete */
/**
 * @public
 * @unofficial
 */
export type FileTreeItemParent = FolderTreeItem | TreeRoot<FileTreeItem | FolderTreeItem>;