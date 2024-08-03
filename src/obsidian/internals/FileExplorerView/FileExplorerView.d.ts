import type {
    TAbstractFile,
    TFile,
    TFolder,
    View
} from "obsidian";
import type { FileTreeItem } from "../FileTreeItem.js";
import type { Tree } from "../Tree.js";
import type { WeakMapWrapper } from "../WeakMapWrapper.js";
import type { FileExplorerViewFileItemsRecord } from "./FileExplorerViewFileItemsRecord.js";

/** @todo Documentation incomplete */
export interface FileExplorerView extends View {
    /**
     * Mapping of file path to tree item
     */
    fileItems: FileExplorerViewFileItemsRecord;
    /**
     * Mapping of tree self element to abstract file
     */
    files: WeakMapWrapper<HTMLElement, TAbstractFile>;
    /**
     * Tree view of files
     */
    tree: Tree<FileTreeItem>;

    openFileContextMenu(event: Event, fileItemElement: HTMLElement): void;
    /**
     * Reveal a file or folder in the file tree
     */
    revealInFolder(file: TFile | TFolder): void;
}
