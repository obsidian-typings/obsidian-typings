import { WeakMapWrapper } from "./WeakMapWrapper.d.ts";
import { View } from "./View.d.ts";
import { Tree } from "./Tree.d.ts";
import { TFile } from "./TFile.d.ts";
import { TAbstractFile } from "./TAbstractFile.d.ts";
import { FileTreeItem } from "./FileTreeItem.d.ts";

/** @todo Documentation incomplete */
export default interface FileExplorerView extends View {
    /**
     * Mapping of file path to tree item
     */
    fileItems: Record<string, TreeItem<FileTreeItem>>;
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
