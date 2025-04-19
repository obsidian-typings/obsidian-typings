import type { View } from 'obsidian';
import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';

/** @todo Documentation incomplete */
/** @public @unofficial */
export interface TagView extends View {
    /** @todo Documentation incomplete */
    getNodeId(e: unknown): unknown;
    /**
     * Get the current view type
     */
    getViewType(): typeof ViewType.Tag;
    /** @todo Documentation incomplete */
    isItem(item: unknown): boolean;
    /** @todo Documentation incomplete */
    onKeyEnterInFocus(event: KeyboardEvent): void;
    /** @todo Documentation incomplete */
    setIsAllCollapsed(e: unknown): void;
    /** @todo Documentation incomplete */
    setUseHierarchy(e: unknown): void;
    /**
     * Reloads all tags from vault, update all items and sort those
     */
    updateTags(): void;
}
