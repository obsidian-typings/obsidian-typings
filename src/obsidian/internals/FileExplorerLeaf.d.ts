import type {
    TFolder,
    WorkspaceLeaf
} from "obsidian";
import type { FileTreeItem } from "./FileTreeItem.js";
import type { FileExplorerView } from "./Views/FileExplorerView.js";

/** @todo Documentation incomplete */
/** @public */
export interface FileExplorerLeaf extends WorkspaceLeaf {
    view: FileExplorerView;

    /** @internal */
    attachDropHandler(x: unknown, y: unknown, z: unknown): unknown;
    /** @internal Get a sorted list of the tree items for a specific folder) */
    getSortedFolderItems(folder: TFolder): FileTreeItem[];
}
