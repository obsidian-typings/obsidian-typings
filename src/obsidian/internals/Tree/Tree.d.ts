import type {
    App,
    Scope,
    View
} from 'obsidian';
import type { InfinityScroll } from './InfinityScroll.d.ts';
import type { TreeItem } from './TreeItem.d.ts';
import type { TreeRoot } from './TreeRoot.d.ts';

/**
 * Hierarchical tree view UI component used for file explorers, search results, and similar views.
 *
 * @typeParam T - The type of tree item managed by this tree.
 * @public
 * @unofficial
 */
export interface Tree<T extends TreeItem> {
    /**
     * Currently active item in tree view.
     */
    activeDom: T | null;

    /**
     * Reference to App.
     */
    app: App;

    /**
     * Container element of the tree view.
     */
    containerEl: HTMLElement;

    /**
     * Currently focused item in tree view.
     */
    focusedItem: T | null;

    /**
     * Handle collapsing of all nodes.
     */
    handleCollapseAll: () => void;

    /**
     * Handle renaming of focused item.
     *
     * @param event - The keyboard event that triggered the rename.
     */
    handleRenameFocusedItem: (event: KeyboardEvent) => void;

    /**
     * ID of the view the tree is associated with.
     */
    id: string;

    /**
     * Facilitates rendering of tree view.
     */
    infinityScroll: InfinityScroll;

    /**
     * Whether all items in the tree are collapsed.
     */
    isAllCollapsed: boolean;

    /**
     * Whether tree items should default to collapsed state.
     */
    prefersCollapsed: boolean;

    /**
     * Request saving of the current fold states.
     */
    requestSaveFolds: () => void;

    /**
     * Key scope for tree view.
     */
    scope: Scope;

    /**
     * Currently selected items in tree view.
     */
    selectedDoms: Set<T>;

    /**
     * The view the tree is associated with.
     */
    view: View;

    /**
     * Root item of the tree view.
     */
    get root(): TreeRoot<T>;

    /**
     * Change the focused item to the next item in specified direction.
     *
     * @param direction - The direction to move focus.
     */
    changeFocusedItem(direction: 'forwards' | 'backwards'): void;

    /**
     * Unselect all selected items in the tree view.
     */
    clearSelectedDoms(): void;

    /**
     * Mark tree item as deselected.
     *
     * @param node - The tree item to deselect.
     */
    deselectItem(node: T): void;

    /**
     * Get the local storage key for the saved tree view folds.
     *
     * @returns The local storage key string.
     */
    getFoldKey(): string;

    /**
     * Gets the ID of a tree item given its Node.
     *
     * @param node - The tree item to get the ID for.
     * @returns The node ID, or `undefined` if not found.
     */
    getNodeId(node: T): string | undefined;

    /**
     * Handle deletion of selected nodes.
     *
     * @param event - The keyboard event that triggered the deletion.
     */
    handleDeleteSelectedItems(event: KeyboardEvent): Promise<void>;

    /**
     * Handle selection of tree item via keyboard event.
     *
     * @param event - The mouse event that triggered the selection.
     * @param node - The tree item being selected.
     */
    handleItemSelection(event: MouseEvent, node: T): void;

    /**
     * Registers all keyboard actions to the tree view keyscope.
     */
    initializeKeyboardNav(): void;

    /**
     * Check whether item is a valid tree item.
     *
     * @param node - The item to check.
     * @returns Whether the item is a valid tree item.
     */
    isItem(node: T | undefined): boolean;

    /**
     * Load the saved fold states of the tree view from local storage.
     */
    loadFolds(): void;

    /**
     * Handle keyboard event for moving/selecting tree item below.
     *
     * @param event - The keyboard event.
     */
    onKeyArrowDown(event: KeyboardEvent): void;

    /**
     * Handle keyboard event for moving through the hierarchy of tree items (and/or folding/unfolding).
     *
     * @param event - The keyboard event.
     */
    onKeyArrowLeft(event: KeyboardEvent): void;

    /**
     * Handle keyboard event for moving through the hierarchy of tree items (and/or folding/unfolding).
     *
     * @param event - The keyboard event.
     */
    onKeyArrowRight(event: KeyboardEvent): void;

    /**
     * Handle keyboard event for moving/selecting tree item above.
     *
     * @param event - The keyboard event.
     */
    onKeyArrowUp(event: KeyboardEvent): void;

    /**
     * Handle keyboard event for opening tree item.
     *
     * @param event - The keyboard event.
     */
    onKeyOpen(event: KeyboardEvent): void;

    /**
     * Update scroll representation on resize.
     */
    onResize(): void;

    /**
     * Save the current fold states of the tree view to local storage.
     */
    saveFolds(): void;

    /**
     * Mark tree item as selected.
     *
     * @param node - The tree item to select.
     */
    selectItem(node: T): void;

    /**
     * Set all items in the tree view to be collapsed or expanded.
     *
     * @param collapse - Whether to collapse all items.
     */
    setCollapseAll(collapse: boolean): void;

    /**
     * Set the focused item in the tree view.
     *
     * @param node - The tree item to focus.
     * @param scrollIntoView - Whether to scroll the item into view.
     */
    setFocusedItem(node: T, scrollIntoView?: boolean): void;

    /**
     * (Un)Collapse all items in the tree view.
     */
    toggleCollapseAll(): void;
}
