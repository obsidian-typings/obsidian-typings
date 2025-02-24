import type { TreeItem } from '../../Tree/TreeItem.d.ts';
import type { FileTreeItem } from './FileTreeItem.d.ts';

/** @public */
export interface FileExplorerViewFileItemsRecord extends Record<string, TreeItem<FileTreeItem>> {}
