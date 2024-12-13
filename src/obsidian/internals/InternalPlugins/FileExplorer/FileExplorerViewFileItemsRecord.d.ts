import type { TreeItem } from '../../TreeItem.js';
import type { FileTreeItem } from './FileTreeItem.js';

/** @public */
export interface FileExplorerViewFileItemsRecord extends Record<string, TreeItem<FileTreeItem>> {}
