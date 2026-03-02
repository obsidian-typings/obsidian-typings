import type {
    ItemView,
    TFile
} from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';

/**
 * View that displays the bookmarks sidebar, showing all bookmarked items in a tree.
 * @public
 * @unofficial
 */
export interface BookmarksView extends ItemView {
    /**
     * Copy the selected bookmarks to the clipboard.
     *
     * @param e - The copy event or context.
     * @param t - The target bookmark items.
     */
    _copyToClipboard(e: unknown, t: unknown): void;

    /**
     * Get the currently active/selected bookmark items.
     *
     * @returns The active bookmark items.
     */
    _getActiveBookmarks(): unknown[];

    /**
     * Attaches the handleDrag of DragManager.
     *
     * @param e - The element to attach the drag handler to.
     */
    attachDragHandler(e: unknown): void;

    /**
     * Attaches the handleDrop of DragManager to containerEl.
     */
    attachDropHandler(): void;

    /**
     * Create a new bookmark group.
     *
     * @param e - The event or context for group creation.
     */
    createNewGroup(e: unknown): void;

    /**
     * Initiate a drag operation for the selected bookmarks.
     *
     * @param e - The drag event.
     * @param t - The drag target information.
     * @returns The drag data, or null.
     */
    dragSelectedBookmarks(e: unknown, t: unknown): unknown | null;

    /**
     * Get the DOM element for a bookmark item.
     *
     * @param e - The bookmark item.
     * @returns The DOM element for the item.
     */
    getItemDom(e: unknown): unknown;

    /**
     * Get the unique node identifier for a bookmark item.
     *
     * @param e - The bookmark item.
     * @returns The node identifier string.
     */
    getNodeId(e: unknown): string;

    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.Bookmarks;

    /**
     * Handle the collapse/expand all toggle action.
     *
     * @param e - Whether to collapse all.
     */
    handleCollapseAll(e: unknown): void;

    /**
     * Check whether the given object is a bookmark item.
     *
     * @param item - The object to check.
     * @returns Whether the object is a bookmark item.
     */
    isItem(item: unknown): boolean;

    /**
     * Handle the context menu event on a bookmark item.
     *
     * @param event - The context menu event.
     */
    onContextMenu(event: unknown): void;

    /**
     * Called when delete is requested.
     *
     * @param event - The event triggered this function.
     */
    onDeleteSelectedItems(event: unknown): unknown;

    /**
     * Called when a file is created.
     *
     * @param file - The created file.
     */
    onFileCreate(file: TFile): void;

    /**
     * Called when a file is deleted.
     *
     * @param file - The deleted file.
     */
    onFileDelete(file: TFile): void;

    /**
     * Handle a file being opened and highlight corresponding bookmark.
     *
     * @param file - The opened file.
     */
    onFileOpen(file: TFile): void;

    /**
     * Called when the rename shortcut is pressed.
     *
     * @param event - The event triggered this function.
     */
    onRenameKey(event: KeyboardEvent): void;

    /** Refresh the bookmarks view. */
    update(): void;
}
