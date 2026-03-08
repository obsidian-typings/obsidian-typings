import type {
    App,
    Component,
    SearchComponent,
    TFile
} from 'obsidian';
import type { ItemQueue } from '../../collections/ItemQueue.d.ts';
import type { ResultDom } from '../../tree/ResultDom.d.ts';
import type { HeaderDom } from './HeaderDom.d.ts';

/**
 * Main UI component that renders backlinks and unlinked mentions for a file.
 * @public
 * @unofficial
 */
export interface BacklinkComponent extends Component {
    /** Reference to the app. */
    app: App;

    /** Whether the backlink section is collapsed. */
    backlinkCollapsed: boolean;

    /** Element displaying the count of backlinks. */
    backlinkCountEl: HTMLSpanElement;

    /** DOM tree rendering backlink search results. */
    backlinkDom: ResultDom;

    /** File for which backlinks are currently displayed. */
    backlinkFile: TFile | null;

    /** Header element for the backlinks section. */
    backlinkHeaderEl: HTMLDivElement;

    /** Queue of files to process for backlink computation. */
    backlinkQueue: ItemQueue<TFile> | null;

    /** Whether all result items are collapsed. */
    collapseAll: boolean;

    /** Button element to toggle collapse all results. */
    collapseAllButtonEl: HTMLDivElement;

    /** Whether extra context lines are shown around matches. */
    extraContext: boolean;

    /** Button element to toggle extra context display. */
    extraContextButtonEl: HTMLDivElement;

    /** The file whose backlinks are being shown. */
    file: TFile | null;

    /** Header DOM for navigation buttons and sort controls. */
    headerDom: HeaderDom;

    /** Whether the search filter is currently visible. */
    isShowingSearch: boolean;

    /** Search input component for filtering results. */
    searchComponent: SearchComponent;

    /** Current search query string. */
    searchQuery: null;

    /** Button element to toggle the search filter visibility. */
    showSearchButtonEl: HTMLDivElement;

    /** Current sort order for results. */
    sortOrder: string;

    /** Placement direction for tooltips. */
    tooltipPlacement: string;

    /** Comma-separated aliases used for unlinked mention matching. */
    unlinkedAliases: string;

    /** Whether the unlinked mentions section is collapsed. */
    unlinkedCollapsed: boolean;

    /** Element displaying the count of unlinked mentions. */
    unlinkedCountEl: HTMLSpanElement;

    /** DOM tree rendering unlinked mention search results. */
    unlinkedDom: ResultDom;

    /** File for which unlinked mentions are being computed. */
    unlinkedFile: null;

    /** Header element for the unlinked mentions section. */
    unlinkedHeaderEl: HTMLDivElement;

    /** Queue of files to process for unlinked mention computation. */
    unlinkedQueue: null;

    /**
     * Add a link from an unlinked mention to the target file.
     *
     * @returns The result of adding the link.
     */
    addLinkFunction(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /**
     * Get the current state of the backlink component.
     *
     * @returns The current state.
     */
    getState(): unknown;

    /**
     * Handle a file content change event.
     *
     * @returns The handler result.
     */
    onFileChanged(arg1: unknown): unknown;

    /**
     * Handle a file deletion event.
     *
     * @returns The handler result.
     */
    onFileDeleted(arg1: unknown): unknown;

    /**
     * Handle a file rename event.
     *
     * @returns The handler result.
     */
    onFileRename(arg1: unknown): unknown;

    /**
     * Lifecycle hook called when the component is loaded.
     *
     * @returns The load result.
     */
    onload(): unknown;

    /**
     * Handle a metadata cache change event.
     *
     * @returns The handler result.
     */
    onMetadataChanged(arg1: unknown): unknown;

    /**
     * Handle the component being resized.
     *
     * @returns The handler result.
     */
    onResize(): unknown;

    /**
     * Handle the collapse all toggle button click.
     *
     * @returns The handler result.
     */
    onToggleCollapseClick(): unknown;

    /**
     * Handle the extra context toggle button click.
     *
     * @returns The handler result.
     */
    onToggleMoreContextClick(): unknown;

    /**
     * Handle the show search toggle button click.
     *
     * @returns The handler result.
     */
    onToggleShowSearch(): unknown;

    /**
     * Check if a result passes the current search filter.
     *
     * @returns Whether the result passes the filter.
     */
    passSearchFilter(arg1: unknown, arg2: unknown): unknown;

    /**
     * Recompute backlinks for the given file.
     *
     * @param backlinkFile - The file to recompute backlinks for, or `null`.
     */
    recomputeBacklink(backlinkFile: TFile | null): void;

    /**
     * Recompute unlinked mentions for the current file.
     *
     * @returns The recomputation result.
     */
    recomputeUnlinked(arg1: unknown): unknown;

    /**
     * Set whether the backlink section is collapsed.
     *
     * @returns The result of setting backlink collapsed state.
     */
    setBacklinkCollapsed(arg1: unknown, arg2: unknown): Promise<unknown>;

    /**
     * Set whether all results are collapsed.
     *
     * @returns The result of setting collapse state.
     */
    setCollapseAll(arg1: unknown): unknown;

    /**
     * Set whether extra context lines are shown.
     *
     * @returns The result of setting extra context.
     */
    setExtraContext(arg1: unknown): unknown;

    /**
     * Set the collapsed state of a specific section.
     *
     * @returns The result of setting the section collapsed state.
     */
    setSectionCollapsed(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): Promise<unknown>;

    /**
     * Set the visibility of the search filter.
     *
     * @returns The result of toggling search visibility.
     */
    setShowSearch(arg1: unknown): unknown;

    /**
     * Set the sort order for results.
     *
     * @returns The result of setting sort order.
     */
    setSortOrder(arg1: unknown): unknown;

    /**
     * Restore the component from a saved state.
     *
     * @returns The result of restoring the state.
     */
    setState(arg1: unknown): Promise<unknown>;

    /**
     * Set whether the unlinked mentions section is collapsed.
     *
     * @returns The result of setting unlinked collapsed state.
     */
    setUnlinkedCollapsed(arg1: unknown, arg2: unknown): Promise<unknown>;

    /** Cancel the current backlink search computation. */
    stopBacklinkSearch(): void;

    /**
     * Cancel the current unlinked mentions search computation.
     *
     * @returns The cancellation result.
     */
    stopUnlinkedSearch(): unknown;

    /**
     * Toggle the collapsed state of the backlinks section.
     *
     * @returns The toggle result.
     */
    toggleBacklinkCollapsed(): unknown;

    /**
     * Toggle the collapsed state of the unlinked mentions section.
     *
     * @returns The toggle result.
     */
    toggleUnlinkedCollapsed(): unknown;

    /**
     * Refresh both backlink and unlinked mention results.
     *
     * @returns The update result.
     */
    update(): unknown;

    /**
     * Update the tooltip text of a section header.
     *
     * @returns The result of updating the header tooltip.
     */
    updateHeaderTooltip(arg1: unknown, arg2: unknown): unknown;

    /**
     * Refresh the search filter and recompute filtered results.
     *
     * @returns The update result.
     */
    updateSearch(): unknown;
}
