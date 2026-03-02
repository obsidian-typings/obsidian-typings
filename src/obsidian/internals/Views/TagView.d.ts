import type { View } from 'obsidian';
import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';

/**
 * View for browsing and navigating tags in the vault.
 * @public
 * @unofficial
 */
export interface TagView extends View {
    /** Get the identifier of a tag tree node. */
    getNodeId(e: unknown): unknown;

    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.Tag;

    /** Check whether the given item is a valid tag view item. */
    isItem(item: unknown): boolean;

    /** Handle pressing Enter on the currently focused tag item. */
    onKeyEnterInFocus(event: KeyboardEvent): void;

    /** Set whether all tag groups are collapsed. */
    setIsAllCollapsed(e: unknown): void;

    /** Set whether tags should be displayed in a nested hierarchy. */
    setUseHierarchy(e: unknown): void;

    /**
     * Reloads all tags from vault, update all items and sort those.
     */
    updateTags(): void;
}
