import type { FileTreeItem } from './FileTreeItem.js';
import type { TreeItem } from '../../TreeItem.js';

/** @public */
export interface FileExplorerViewFileItemsRecord extends Record<string, TreeItem<FileTreeItem>> {}
