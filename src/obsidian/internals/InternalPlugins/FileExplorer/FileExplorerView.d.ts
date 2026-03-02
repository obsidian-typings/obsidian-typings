import type {
    Debouncer,
    PaneType,
    TAbstractFile,
    TFile,
    TFolder,
    View
} from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';
import type { Tree } from '../../Tree/Tree.d.ts';
import type { WeakMapWrapper } from '../../WeakMapWrapper.d.ts';
import type { FileExplorerViewFileItemsRecord } from './FileExplorerViewFileItemsRecord.d.ts';
import type { FileExplorerViewSortOrder } from './FileExplorerViewSortOrder.d.ts';
import type { FileTreeItem } from './FileTreeItem.d.ts';
import type { FolderTreeItem } from './FolderTreeItem.d.ts';

/**
 * View that renders the file explorer tree sidebar for navigating vault files and folders.
 * @public
 * @unofficial
 */
export interface FileExplorerView extends View {
    /**
     * Mapping of file path to tree item.
     */
    fileItems: FileExplorerViewFileItemsRecord;

    /**
     * Mapping of tree self element to abstract file.
     */
    files: WeakMapWrapper<HTMLElement, TAbstractFile>;

    /**
     * Last dragged over folder item element.
     * `null` when there is no folder item being dragged over.
     */
    lastDropTargetEl: HTMLElement | null;

    /** Timeout ID for expanding a folder on mouseover during drag, or null. */
    mouseoverExpandTimeout: number | null;

    /**
     * Indicate ready state of the view.
     */
    ready: boolean;

    /**
     * Try to sort tree items.
     */
    requestSort: Debouncer<[], void>;

    /**
     * Current sort order of file tree items.
     */
    sortOrder: FileExplorerViewSortOrder;

    /**
     * Tree view of files.
     */
    tree: Tree<FileTreeItem | FolderTreeItem>;

    /**
     * Try to rename the file.
     */
    acceptRename(): Promise<void>;

    /**
     * Is Executed after creating the file or folder and opens the view and/or starts the rename.
     *
     * @param file - The created file.
     * @param newLeaf - Where to open the view for this file.
     */
    afterCreate(file: TFile, newLeaf: PaneType | boolean): Promise<void>;

    /**
     * Used internally to attach drop handler to the tree root and folder items.
     *
     * @param folder - Folder that's associated with the item.
     * @param el - Element of the tree root or folder item.
     */
    attachDropHandler(folder: TFolder, el: HTMLElement): void;

    /**
     * Attach file-related event listeners to an element.
     *
     * @param e - The element to attach events to.
     */
    attachFileEvents(e: unknown): void;

    /**
     * Creates an file or folder.
     *
     * @param type - The type of file to create.
     * @param location - The location where to create the file.
     * @param newLeaf - Where to open the view for this file.
     */
    createAbstractFile(type: 'file' | 'folder', location: TFolder, newLeaf: PaneType | boolean): Promise<void>;

    /**
     * Create a tree item DOM element for the given folder.
     *
     * @param folder - The folder to create a tree item for.
     * @returns The created folder tree item.
     */
    createFolderDom(folder: TFolder): unknown;

    /**
     * Create a tree item DOM element for the given file.
     *
     * @param file - The file to create a tree item for.
     * @returns The created file tree item.
     */
    createItemDom(file: TFile): unknown;

    /**
     * Display an error message on a file tree item.
     *
     * @param message - The error message to display.
     * @param fileItem - The file tree item to display the error on.
     */
    displayError(message: string, fileItem: unknown): void;

    /**
     * Handle dragging files from the file explorer.
     *
     * @param event - The drag event.
     * @param t - The drag target information.
     * @returns The drag result.
     */
    dragFiles(event: DragEvent, t: unknown): unknown;

    /**
     * Quits the rename.
     */
    exitRename(): void;

    /**
     * Get the unique node identifier for a tree item.
     *
     * @param e - The tree item.
     * @returns The node identifier.
     */
    getNodeId(e: unknown): unknown;

    /**
     * Get a sorted list of the tree items for a specific folder).
     *
     * @param folder - The folder to get sorted items for.
     * @returns The sorted file tree items.
     */
    getSortedFolderItems(folder: TFolder): FileTreeItem[];

    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.FileExplorer;

    /**
     * Check whether the given object is a file tree item.
     *
     * @param item - The object to check.
     * @returns Whether the object is a file tree item.
     */
    isItem(item: unknown): boolean;

    /**
     * Is called when a new file is created in vault. Updates the file tree.
     *
     * @param file - The new file or folder.
     */
    onCreate(file: TAbstractFile): void;

    /**
     * Is called when on the new folder icon is clicked. Call createAbstractFile().
     *
     * @param event - The MouseEvent which triggered this function.
     */
    onCreateNewFolderClick(event: MouseEvent): Promise<void>;

    /**
     * Is called when on the new note icon is clicked. Call createAbstractFile().
     *
     * @param event - The MouseEvent which triggered this function.
     */
    onCreateNewNoteClick(event: MouseEvent): Promise<void>;

    /**
     * Is called when a file in vault is deleted. Updates the file tree.
     *
     * @param file - The deleted file or folder.
     */
    onDelete(file: TAbstractFile): void;

    /**
     * Called when delete is requested.
     *
     * @param event - The event triggered this function.
     */
    onDeleteSelectedFiles(event: unknown): unknown;

    /**
     * Called when a extensions update is triggered.
     * Event: 'extensions-updated'.
     */
    onExtensionsUpdated(): void;

    /**
     * Called when the mouse pointer moves away from an element.
     * Event: 'mouseout'.
     *
     * @param event - The event triggered this function.
     * @param targetEl - The target Element.
     */
    onFileMouseout(event: MouseEvent, targetEl: HTMLElement): void;

    /**
     * Called when the mouse pointer is moved over an element. Updates the tooltip information.
     * Event: 'mouseover'.
     *
     * @param event - The event triggered this function.
     * @param targetEl - The target Element.
     */
    onFileMouseover(event: MouseEvent, targetEl: HTMLElement): void;

    /**
     * Called when a file is opened. Brings the file to the front.
     *
     * @param file - The opened file.
     */
    onFileOpen(file: TFile): void;

    /**
     * Handle input events in the file rename text field.
     *
     * @param e - The input event.
     */
    onFileRenameInput(e: unknown): void;

    /**
     * Called when 'Enter' is pressed while rename. Accepts the rename.
     *
     * @param event - The event triggered this function.
     */
    onKeyEnterInRename(event: KeyboardEvent): void;

    /**
     * Called when 'ESC' is pressed while rename. Denies the rename.
     */
    onKeyEscInRename(): void;

    /**
     * Called when the rename shortcut is pressed.
     *
     * @param event - The event triggered this function.
     */
    onKeyRename(event: KeyboardEvent): void;

    /**
     * Request a sort if not sorted properly.
     */
    onModify(): void;

    /**
     * Is called when a file in vault is renamed. Updates the file tree.
     *
     * @param file - The renamed file or folder.
     * @param oldPath - The old file or folder path.
     */
    onRename(file: TAbstractFile, oldPath: string): void;

    /**
     * Called when the title is deselected. Calls acceptRename().
     */
    onTitleBlur(): void;

    /**
     * Opens the context menu for the file item.
     *
     * @param event - The event.
     * @param fileItemEl - The file item clicked on.
     */
    openFileContextMenu(event: Event, fileItemEl: HTMLElement): void;

    /**
     * Reveal a file or folder in the file tree.
     *
     * @param file - The file or folder to reveal.
     */
    revealInFolder(file: TFile | TFolder): void;

    /**
     * Set whether all folders are collapsed.
     *
     * @param e - Whether to collapse all folders.
     */
    setIsAllCollapsed(e: unknown): void;

    /**
     * Updates the sort order and sort by it.
     *
     * @param order - The sort order.
     */
    setSortOrder(order: unknown): void;

    /**
     * Sorts the file items in this view.
     */
    sort(): void;

    /**
     * Begin inline renaming of a file tree item.
     *
     * @param e - The file tree item to rename.
     * @returns The rename result.
     */
    startRenameFile(e: unknown): unknown;

    /**
     * Reloads the config from vault and update all items.
     */
    updateConfig(): void;
}
