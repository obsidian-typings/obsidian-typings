import type {
    App,
    Debouncer,
    TFile
} from 'obsidian';
import type { InfinityScroll } from './InfinityScroll.d.ts';
import type { ResultDomItem } from './ResultDomItem.d.ts';
import type { ResultDomResult } from './ResultDomResult.d.ts';
import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';
import type { TreeNodeVChildren } from './TreeNodeVChildren.d.ts';

/**
 * Container for search result DOM elements, managing the display of file search results.
 * @public
 * @unofficial
 */
export interface ResultDom {
    /**
     * Add a search result for a file to the result DOM.
     *
     * @param file - The file to add a result for.
     * @param result - The search result data.
     * @param content - The text content of the file.
     * @param shouldShowTitle - Whether to show the file title.
     * @returns The created result DOM item.
     */
    addResult(file: TFile, result: ResultDomResult, content: string, shouldShowTitle?: boolean): ResultDomItem;

    /** Reference to the App instance. */
    app: App;

    /** Debounced callback triggered when results change. */
    changed: Debouncer<[], unknown>;

    /**
     * Change which result item has focus.
     *
     * @returns The result of changing the focused item.
     */
    changeFocusedItem(arg1: unknown): unknown;

    /** Container element for child result items. */
    childrenEl: HTMLDivElement;

    /** Whether all result items are collapsed. */
    collapseAll: boolean;

    /** Root element of the result DOM. */
    el: HTMLDivElement;

    /**
     * Clear all search results from the DOM.
     *
     * @returns The result of clearing.
     */
    emptyResults(): unknown;

    /** Element displayed when there are no search results. */
    emptyStateEl: HTMLDivElement;

    /** Whether extra surrounding context is shown around matches. */
    extraContext: boolean;

    /** Currently focused result item, or `null` if none. */
    focusedItem: null;

    /**
     * Get the list of files with search results.
     *
     * @returns The list of files with results.
     */
    getFiles(): unknown;

    /**
     * Get the total number of matches across all results.
     *
     * @returns The total match count.
     */
    getMatchCount(): number;

    /**
     * Get the result DOM item for a specific file.
     *
     * @returns The result DOM item.
     */
    getResult(arg1: unknown): unknown;

    /** Virtual scrolling component for rendering visible results. */
    infinityScroll: InfinityScroll;

    /** Layout information used by virtual scrolling. */
    info: TreeNodeInfo;

    /**
     * Callback invoked when the result set changes.
     *
     * @returns The result of the change handler.
     */
    onChange(): unknown;

    /**
     * Handle resize events and recalculate layout.
     *
     * @returns The result of the resize handler.
     */
    onResize(): unknown;

    /** Spacer element used to maintain correct scroll height. */
    pusherEl: HTMLDivElement;

    /**
     * Remove a search result from the DOM.
     *
     * @returns The result of the removal.
     */
    removeResult(arg1: unknown): unknown;

    /** Lookup map from file to its corresponding result DOM item. */
    resultDomLookup: Map<TFile, ResultDomItem>;

    /**
     * Set whether all result items should be collapsed.
     *
     * @returns The result of setting collapse state.
     */
    setCollapseAll(arg1: unknown): unknown;

    /**
     * Set whether extra context is shown around matches.
     *
     * @returns The result of setting extra context.
     */
    setExtraContext(arg1: unknown): unknown;

    /**
     * Set the focused result item.
     *
     * @returns The result of setting the focused item.
     */
    setFocusedItem(arg1: unknown): unknown;

    /** Whether the empty state placeholder is currently displayed. */
    showingEmptyState: boolean;

    /** Current sort order for search results. */
    sortOrder: string;

    /**
     * Show a loading indicator while search is in progress.
     *
     * @returns The result of starting the loader.
     */
    startLoader(): unknown;

    /**
     * Hide the loading indicator when search completes.
     *
     * @returns The result of stopping the loader.
     */
    stopLoader(): unknown;

    /**
     * Toggle the collapsed state of a result item.
     *
     * @returns The result of toggling the collapse state.
     */
    toggle(arg1: unknown, arg2: unknown): Promise<unknown>;

    /** Virtual children manager for result items. */
    vChildren: TreeNodeVChildren<ResultDomItem, ResultDom>;

    /** Whether a search operation is currently in progress. */
    working: boolean;
}
