import type {
  Debouncer,
  PaneType,
  Scope,
  TAbstractFile,
  TFile,
  TFolder,
  View
} from 'obsidian';

import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';
import type { NavigationSearch } from '../../components/NavigationSearch.d.ts';
import type { PromisedQueue } from '../../PromisedQueue.d.ts';
import type { ObsidianSearchQuery } from '../../search-query/ObsidianSearchQuery.d.ts';
import type { Tree } from '../../tree/Tree.d.ts';
import type { WeakMapWrapper } from '../../WeakMapWrapper.d.ts';
import type { HeaderDom } from '../backlink/HeaderDom.d.ts';
import type { FileExplorerViewFileItemsRecord } from './FileExplorerViewFileItemsRecord.d.ts';
import type { FileExplorerViewSortOrder } from './FileExplorerViewSortOrder.d.ts';
import type { FileTreeItem } from './FileTreeItem.d.ts';
import type { FolderTreeItem } from './FolderTreeItem.d.ts';

/**
 * {@link obsidian#View} that renders the file explorer tree sidebar for navigating vault files and folders.
 *
 * @public
 * @unofficial
 */
export interface FileExplorerView extends View {
  /** Whether revealing the active file is deferred until the view is shown. */
  _revealActiveFileQueued: boolean;

  /** Whether sorting is deferred until the view is shown. */
  _sortQueued: boolean;

  /** The active file row, or no row when the active file is absent from the tree. */
  activeDom: FileTreeItem | FolderTreeItem | null | undefined;

  /** Button that toggles revealing the active file. */
  autoRevealButtonEl: HTMLDivElement;

  /** Whether the active file is automatically revealed. */
  autoRevealFile: boolean;

  /** Button that collapses or expands all folders. */
  collapseOrExpandAllEl: HTMLDivElement;

  /** The file or folder being renamed, or `null`. */
  fileBeingRenamed: null | TAbstractFile;

  /**
   * Mapping of file path to tree item.
   */
  fileItems: FileExplorerViewFileItemsRecord;

  /** Keyboard scope used during inline renaming. */
  fileRenameScope: Scope;

  /**
   * Mapping of tree self element to abstract file.
   */
  files: WeakMapWrapper<HTMLElement, TAbstractFile>;

  /** Navigation header containing the view controls. */
  headerDom: HeaderDom;

  /**
   * Tree items marked by the last cut, cleared once they are pasted.
   */
  itemsBeingCut: (FileTreeItem | FolderTreeItem)[];

  /**
   * Last dragged over folder item element.
   * `null` when there is no folder item being dragged over.
   */
  lastDropTargetEl: HTMLElement | null;

  /**
   * Timeout ID for expanding a folder on mouseover during drag, or `null`.
   */
  mouseoverExpandTimeout: null | number;

  /** Container for the file tree. */
  navFileContainerEl: HTMLDivElement;

  /**
   * Indicate ready state of the view.
   */
  ready: boolean;

  /**
   * Try to sort tree items.
   */
  requestSort: Debouncer<[], void>;

  /** Search visibility and input controls. */
  search: NavigationSearch;

  /**
   * The active filter query for the file explorer, or `null` when no filter is applied.
   */
  searchQuery: null | ObsidianSearchQuery;

  /**
   * Current sort order of file tree items.
   */
  sortOrder: FileExplorerViewSortOrder;

  /**
   * {@link Tree} view of files.
   */
  tree: Tree<FileTreeItem | FolderTreeItem>;

  /** Queue serializing file tree updates. */
  workQueue: PromisedQueue;

  /**
   * Is Executed after creating the file or folder and opens the view and/or starts the rename.
   *
   * @param file - The created file.
   * @param newLeaf - Where to open the view for this file.
   * @returns A promise that resolves when the file is opened and/or rename is started.
   */
  afterCreate(file: TFile, newLeaf: boolean | PaneType): Promise<void>;

  /**
   * Used internally to attach drop handler to the tree root and folder items.
   *
   * @param folder - Folder that's associated with the item.
   * @param el - Element of the tree root or folder item.
   */
  attachDropHandler(folder: TFolder, el: HTMLElement): void;

  /**
   * Creates an file or folder.
   *
   * @param type - The type of file to create.
   * @param location - The location where to create the file.
   * @param newLeaf - Where to open the view for this file.
   * @returns A promise that resolves when the file or folder is created.
   */
  createAbstractFile(type: 'file' | 'folder', location: TFolder, newLeaf: boolean | PaneType): Promise<void>;

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
   * @param $event - The drag event.
   * @param t - The drag target information.
   * @returns The drag result.
   */
  dragFiles($event: DragEvent, t: unknown): unknown;

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
   * Get a sorted list of the tree items for a specific folder's direct children, subfolders first.
   *
   * @param folder - The folder to get sorted items for.
   * @returns The sorted tree items, both file and folder ones.
   */
  getSortedFolderItems(folder: TFolder): (FileTreeItem | FolderTreeItem)[];

  /**
   * Get the current view type.
   *
   * @returns The file explorer view type.
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
   * Handle a vault configuration change.
   *
   * @param key - The changed configuration key.
   */
  onConfigChanged(key: string): void;

  /**
   * Is called when a new file is created in vault. Updates the file tree.
   *
   * @param file - The new file or folder.
   */
  onCreate(file: TAbstractFile): void;

  /**
   * Is called when on the new folder icon is clicked. Call createAbstractFile().
   *
   * @param $event - The MouseEvent which triggered this function.
   * @returns A promise that resolves when the folder is created.
   */
  onCreateNewFolderClick($event: MouseEvent): Promise<void>;

  /**
   * Is called when on the new note icon is clicked. Call createAbstractFile().
   *
   * @param $event - The MouseEvent which triggered this function.
   * @returns A promise that resolves when the note is created.
   */
  onCreateNewNoteClick($event: MouseEvent): Promise<void>;

  /**
   * Is called when a file in vault is deleted. Updates the file tree.
   *
   * @param file - The deleted file or folder.
   */
  onDelete(file: TAbstractFile): void;

  /**
   * Called when delete is requested.
   *
   * @param $event - The event triggered this function.
   * @returns The result of the delete operation.
   */
  onDeleteSelectedFiles($event: unknown): unknown;

  /**
   * Called when a extensions update is triggered.
   * Event: 'extensions-updated'.
   */
  onExtensionsUpdated(): void;

  /**
   * Handle a click on a file or folder title.
   *
   * @param $event - The click or auxiliary click event.
   * @param targetEl - The title element.
   */
  onFileClick($event: MouseEvent, targetEl: HTMLElement): void;

  /**
   * Build and show the context menu for a file or folder. When the file is one of several selected items, shows
   * the multi-file menu (`files-menu`) for the whole selection instead of the `file-menu`.
   *
   * @param $event - The event that opened the menu.
   * @param file - The file or folder the menu is for.
   */
  onFileContextMenu($event: MouseEvent, file: TAbstractFile): void;

  /**
   * Called when a file is opened. Brings the file to the front.
   *
   * @param file - The opened file.
   */
  onFileOpen(file: TFile): void;

  /**
   * Dismiss the title tooltip when the pointer leaves.
   *
   * @param $event - The pointer event.
   * @param targetEl - The title element.
   */
  onFilePointerout($event: PointerEvent, targetEl: HTMLElement): void;

  /**
   * Show the file or folder title tooltip.
   *
   * @param $event - The pointer event.
   * @param targetEl - The title element.
   */
  onFilePointerover($event: PointerEvent, targetEl: HTMLElement): void;

  /**
   * Handle input events in the file rename text field.
   *
   * @param e - The input event.
   */
  onFileRenameInput(e: unknown): void;

  /**
   * Called when 'Enter' is pressed while rename. Accepts the rename.
   *
   * @param $event - The event triggered this function.
   */
  onKeyEnterInRename($event: KeyboardEvent): void;

  /**
   * Called when 'ESC' is pressed while rename. Denies the rename.
   */
  onKeyEscInRename(): void;

  /**
   * Called when the rename shortcut is pressed.
   *
   * @param $event - The event triggered this function.
   */
  onKeyRename($event: KeyboardEvent): void;

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
   * Called when the filter query changes. Compiles it into {@link FileExplorerView.searchQuery} and filters the
   * tree by file path.
   *
   * @param query - The new filter query; empty to clear the filter.
   */
  onSearchChanged(query: string): void;

  /**
   * Save the inline rename when the title loses focus.
   */
  onTitleBlur(): void;

  /**
   * Toggle automatic revealing and save the layout.
   */
  onToggleAutoReveal(): void;

  /**
   * Opens the context menu for the file item.
   *
   * @param $event - The event.
   * @param fileItemEl - The file item clicked on.
   */
  openFileContextMenu($event: Event, fileItemEl: HTMLElement): void;

  /**
   * Expand ancestors and scroll the active file into view.
   */
  revealActiveFile(): void;

  /**
   * Reveal a file or folder in the file tree.
   *
   * @param file - The file or folder to reveal.
   */
  revealInFolder(file: TAbstractFile): void;

  /**
   * Save the current inline rename.
   *
   * @returns Whether the rename succeeded, including when no rename is active.
   */
  saveRename(): Promise<boolean>;

  /**
   * Set whether the active file is revealed automatically.
   *
   * @param value - Whether to reveal the active file.
   */
  setAutoReveal(value: boolean): void;

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
   * Show and focus the search input.
   */
  showSearch(): void;

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
   * Refresh unsupported-file visibility and tree layout.
   */
  updateShowUnsupportedFiles(): void;
}
