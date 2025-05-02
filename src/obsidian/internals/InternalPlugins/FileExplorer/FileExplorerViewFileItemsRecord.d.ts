import type { FileTreeItem } from './FileTreeItem.d.ts';
import type { FolderTreeItem } from './FolderTreeItem.d.ts';

/**
 * @public
 * @unofficial
 */
export interface FileExplorerViewFileItemsRecord extends Record<string, FileTreeItem | FolderTreeItem> {}
