import type { View } from "obsidian";
/** @todo Documentation incomplete */
export interface TagView extends View {
    /** @internal */
    getNodeId(e: unknown): unknown;
    /** @internal */
    isItem(e: unknown): boolean;
    /** @internal */
    onKeyEnterInFocus(e: unknown): void;
    /**
     * Get the current view type
     */
    getViewType(): "tag";
    /** @internal */
    setIsAllCollapsed(e: unknown): void;
    /** @internal */
    setUseHierarchy(e: unknown): void;
    /** @internal */
    updateTags(): void;
}
