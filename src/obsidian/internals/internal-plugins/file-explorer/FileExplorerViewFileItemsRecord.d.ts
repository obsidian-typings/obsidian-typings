import type { FileTreeItem } from './FileTreeItem.d.ts';
import type { FolderTreeItem } from './FolderTreeItem.d.ts';

/**
 * Record mapping file paths to their corresponding file or folder tree items.
 *
 * @public
 * @unofficial
 */
export interface FileExplorerViewFileItemsRecord extends Record<string, FileTreeItem | FolderTreeItem> {}
