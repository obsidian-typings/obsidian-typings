import type {
    FileTreeItem,
    Tree,
    TreeItem,
    WeakMapWrapper
} from "../../types.js";
import type {
    TAbstractFile,
    TFile,
    TFolder,
    View
} from "obsidian";
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

    /** @internal */
    openFileContextMenu(event: Event, fileItemElement: HTMLElement): void;
    /**
     * Reveal a file or folder in the file tree
     */
    revealInFolder(file: TFile | TFolder): void;
    /** @internal */
    isItem(e: unknown): boolean;
    /** @internal */
    getNodeId(e: unknown): unknown;
    /** @internal */
    setIsAllCollapsed(e: unknown): void;
    /**
     * Get the current view type
     */
    getViewType(): "file-explorer";
    /** @internal */
    onCreate(e: unknown): void;
    /** @internal */
    onDelete(e: unknown): void;
    /** @internal */
    onRename(e: unknown, t: unknown): void;
    /** @internal */
    onModify(): void;
    /** @internal */
    updateConfig(): void;
    /** @internal */
    setSortOrder(e: unknown): void;
    /** @internal */
    onCreateNewFolderClick(e: unknown): unknown;
    /** @internal */
    onCreateNewNoteClick(e: unknown): unknown;
    /** @internal */
    createAbstractFile(e: unknown, t: unknown, n: unknown): unknown;
    /** @internal */
    afterCreate(e: unknown, t: unknown): unknown;
    /** @internal */
    onFileMouseover(e: unknown, t: unknown): void;
    /** @internal */
    onFileMouseout(e: unknown, t: unknown): void;
    /** @internal */
    onFileOpen(e: unknown): void;
    /** @internal */
    sort(): void;
    /** @internal */
    attachFileEvents(e: unknown): void;
    /** @internal */
    dragFiles(e: unknown, t: unknown): unknown;
    /** @internal */
    createItemDom(e: unknown): unknown;
    /** @internal */
    createFolderDom(e: unknown): unknown;
    /** @internal */
    onTitleBlur(): void;
    /** @internal */
    onFileRenameInput(e: unknown): void;
    /** @internal */
    startRenameFile(e: unknown): unknown;
    /** @internal */
    acceptRename(): unknown;
    /** @internal */
    displayError(e: unknown, t: unknown): void;
    /** @internal */
    exitRename(): void;
    /** @internal */
    onKeyEnterInRename(e: unknown): void;
    /** @internal */
    onKeyEscInRename(): void;
    /** @internal */
    onDeleteSelectedFiles(e: unknown): unknown;
    /** @internal */
    onKeyRename(e: unknown): void;
    /** @internal */
    onExtensionsUpdated(): void;
}

export interface FileExplorerViewFileItemsRecord extends Record<string, TreeItem<FileTreeItem>> {}
