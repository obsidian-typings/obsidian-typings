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
    /** Reference to the App instance. */
    app: App;

    /** Debounced callback triggered when results change. */
    changed: Debouncer<[], unknown>;

    /** Container element for child result items. */
    childrenEl: HTMLDivElement;

    /** Whether all result items are collapsed. */
    collapseAll: boolean;

    /** Root element of the result DOM. */
    el: HTMLDivElement;

    /** Element displayed when there are no search results. */
    emptyStateEl: HTMLDivElement;

    /** Whether extra surrounding context is shown around matches. */
    extraContext: boolean;

    /** Currently focused result item, or null if none. */
    focusedItem: null;

    /** Virtual scrolling component for rendering visible results. */
    infinityScroll: InfinityScroll;

    /** Layout information used by virtual scrolling. */
    info: TreeNodeInfo;

    /** Spacer element used to maintain correct scroll height. */
    pusherEl: HTMLDivElement;

    /** Lookup map from file to its corresponding result DOM item. */
    resultDomLookup: Map<TFile, ResultDomItem>;

    /** Whether the empty state placeholder is currently displayed. */
    showingEmptyState: boolean;

    /** Current sort order for search results. */
    sortOrder: string;

    /** Virtual children manager for result items. */
    vChildren: TreeNodeVChildren<ResultDomItem, ResultDom>;

    /** Whether a search operation is currently in progress. */
    working: boolean;

    /** Add a search result for a file to the result DOM. */
    addResult(file: TFile, result: ResultDomResult, content: string, shouldShowTitle?: boolean): ResultDomItem;

    /** Change which result item has focus. */
    changeFocusedItem(arg1: unknown): unknown;

    /** Clear all search results from the DOM. */
    emptyResults(): unknown;

    /** Get the list of files with search results. */
    getFiles(): unknown;

    /** Get the total number of matches across all results. */
    getMatchCount(): number;

    /** Get the result DOM item for a specific file. */
    getResult(arg1: unknown): unknown;

    /** Callback invoked when the result set changes. */
    onChange(): unknown;

    /** Handle resize events and recalculate layout. */
    onResize(): unknown;

    /** Remove a search result from the DOM. */
    removeResult(arg1: unknown): unknown;

    /** Set whether all result items should be collapsed. */
    setCollapseAll(arg1: unknown): unknown;

    /** Set whether extra context is shown around matches. */
    setExtraContext(arg1: unknown): unknown;

    /** Set the focused result item. */
    setFocusedItem(arg1: unknown): unknown;

    /** Show a loading indicator while search is in progress. */
    startLoader(): unknown;

    /** Hide the loading indicator when search completes. */
    stopLoader(): unknown;

    /** Toggle the collapsed state of a result item. */
    toggle(arg1: unknown, arg2: unknown): Promise<unknown>;
}
