import { WorkspaceLeaf } from "./WorkspaceLeaf.d.ts";
import { FileTreeItem } from "./FileTreeItem.d.ts";
import { FileExplorerView } from "./FileExplorerView.d.ts";

/** @todo Documentation incomplete */
export default interface FileExplorerLeaf extends WorkspaceLeaf {
    view: FileExplorerView;

    /** @internal */
    attachDropHandler(x: unknown, y: unknown, z: unknown): unknown;
    /** @internal Get a sorted list of the tree items for a specific folder) */
    getSortedFolderItems(folder: TFolder): FileTreeItem[];
}
