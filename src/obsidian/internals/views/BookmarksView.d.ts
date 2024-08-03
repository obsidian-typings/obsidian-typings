import type { ItemView } from "obsidian";
/** @todo Documentation incomplete */
export interface BookmarksView extends ItemView {
    onFileCreate(e: unknown): void;
    onFileDelete(e: unknown): void;
    handleCollapseAll(event: unknown): void;
    /**
     * Get the current view type
     */
    getViewType(): "bookmarks";
    /** @internal */
    isItem(e: unknown): boolean;
    /** @internal */
    attachDropHandler(): void;
    /** @internal */
    onRenameKey(e: unknown): void;
    /** @internal */
    onDeleteSelectedItems(e: unknown): unknown;
    /** @internal */
    getNodeId(e: unknown): string;
    /** @internal */
    createNewGroup(e: unknown): void;
    /** @internal */
    onContextMenu(e: unknown): void;
    /** @internal */
    onFileOpen(e: unknown): void;
    /** @internal */
    dragSelectedBookmarks(e: unknown, t: unknown): unknown | null;
    /** @internal */
    getItemDom(e: unknown): unknown;
    /** @internal */
    attachDragHandler(e: unknown): void;
    /** @internal */
    update(): void;
    /** @internal */
    _copyToClipboard(e: unknown, t: unknown): void;
    /** @internal */
    _getActiveBookmarks(): unknown[];
}
