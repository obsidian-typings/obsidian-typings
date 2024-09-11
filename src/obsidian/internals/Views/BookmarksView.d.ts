import type {
    ItemView,
    TFile
} from 'obsidian';

/** @todo Documentation incomplete */
/** @public */
export interface BookmarksView extends ItemView {
    /**
     * Called when a file is created.
     * @param file - The created file
     */
    onFileCreate(file: TFile): void;
    /**
     * Called when a file is deleted.
     * @param file - The deleted file
     */
    onFileDelete(file: TFile): void;
    /** @todo Documentation incomplete */
    handleCollapseAll(e: unknown): void;
    /**
     * Get the current view type
     */
    getViewType(): 'bookmarks';
    /** @todo Documentation incomplete */
    isItem(item: unknown): boolean;
    /**
     * Attaches the handleDrop of DragManager to containerEl
     */
    attachDropHandler(): void;
    /**
     * Called when the rename shortcut is pressed
     * @param event - The event triggered this function
     */
    onRenameKey(event: KeyboardEvent): void;
    /**
     * Called when delete is requested
     * @param event - The event triggered this function
     */
    onDeleteSelectedItems(event: unknown): unknown;
    /** @todo Documentation incomplete */
    getNodeId(e: unknown): string;
    /** @todo Documentation incomplete */
    createNewGroup(e: unknown): void;
    /** @todo Documentation incomplete */
    onContextMenu(event: unknown): void;
    /** @todo Documentation incomplete */
    onFileOpen(file: TFile): void;
    /** @todo Documentation incomplete */
    dragSelectedBookmarks(e: unknown, t: unknown): unknown | null;
    /** @todo Documentation incomplete */
    getItemDom(e: unknown): unknown;
    /**
     * Attaches the handleDrag of DragManager
     */
    attachDragHandler(e: unknown): void;
    /** @todo Documentation incomplete */
    update(): void;
    /** @todo Documentation incomplete */
    _copyToClipboard(e: unknown, t: unknown): void;
    /** @todo Documentation incomplete */
    _getActiveBookmarks(): unknown[];
}
