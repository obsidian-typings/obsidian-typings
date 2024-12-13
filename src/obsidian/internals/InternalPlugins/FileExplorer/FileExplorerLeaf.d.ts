import type {
    TFolder,
    WorkspaceLeaf
} from 'obsidian';
import type { FileExplorerView } from './FileExplorerView.js';
import type { FileTreeItem } from './FileTreeItem.js';

/** @todo Documentation incomplete */
/** @public */
export interface FileExplorerLeaf extends WorkspaceLeaf {
    view: FileExplorerView;

    /** @internal */
    attachDropHandler(x: unknown, y: unknown, z: unknown): unknown;
    /** @internal Get a sorted list of the tree items for a specific folder) */
    getSortedFolderItems(folder: TFolder): FileTreeItem[];
}
