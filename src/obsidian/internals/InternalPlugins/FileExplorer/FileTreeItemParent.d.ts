import type { TreeRoot } from '../../Tree/TreeRoot.d.ts';
import type { FileTreeItem } from './FileTreeItem.d.ts';
import type { FolderTreeItem } from './FolderTreeItem.d.ts';

/**
 * Parent type for file tree items: either a folder or the tree root.
 *
 * @public
 * @unofficial
 */
export type FileTreeItemParent = FolderTreeItem | TreeRoot<FileTreeItem | FolderTreeItem>;
