import type {
    App,
    Scope,
    View
} from 'obsidian';
import type { InfinityScroll } from './InfinityScroll.d.ts';
import type { TreeItem } from './TreeItem.d.ts';
import type { TreeRoot } from './TreeRoot.d.ts';

/**
 * @todo Documentation incomplete.
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
     */
    changeFocusedItem(direction: 'forwards' | 'backwards'): void;

    /**
     * Unselect all selected items in the tree view.
     */
    clearSelectedDoms(): void;

    /**
     * Mark tree item as deselected.
     */
    deselectItem(node: T): void;

    /**
     * Get the local storage key for the saved tree view folds.
     */
    getFoldKey(): string;

    /**
     * Gets the ID of a tree item given its Node.
     */
    getNodeId(node: T): string | undefined;

    /**
     * Handle deletion of selected nodes.
     */
    handleDeleteSelectedItems(event: KeyboardEvent): Promise<void>;

    /**
     * Handle selection of tree item via keyboard event.
     */
    handleItemSelection(event: MouseEvent, node: T): void;

    /**
     * Registers all keyboard actions to the tree view keyscope.
     */
    initializeKeyboardNav(): void;

    /**
     * Check whether item is a valid tree item.
     */
    isItem(node: T | undefined): boolean;

    /**
     * Load the saved fold states of the tree view from local storage.
     */
    loadFolds(): void;

    /**
     * Handle keyboard event for moving/selecting tree item below.
     */
    onKeyArrowDown(event: KeyboardEvent): void;

    /**
     * Handle keyboard event for moving through the hierarchy of tree items (and/or folding/unfolding).
     */
    onKeyArrowLeft(event: KeyboardEvent): void;

    /**
     * Handle keyboard event for moving through the hierarchy of tree items (and/or folding/unfolding).
     */
    onKeyArrowRight(event: KeyboardEvent): void;

    /**
     * Handle keyboard event for moving/selecting tree item above.
     */
    onKeyArrowUp(event: KeyboardEvent): void;

    /**
     * Handle keyboard event for opening tree item.
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
     */
    selectItem(node: T): void;

    /**
     * Set all items in the tree view to be collapsed or expanded.
     */
    setCollapseAll(collapse: boolean): void;

    /**
     * Set the focused item in the tree view.
     */
    setFocusedItem(node: T, scrollIntoView?: boolean): void;

    /**
     * (Un)Collapse all items in the tree view.
     */
    toggleCollapseAll(): void;
}
