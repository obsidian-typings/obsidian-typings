import type {
    TFile,
    View,
    WorkspaceLeaf
} from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';
import type { InfoFileView } from '../../Views/InfoFileView.d.ts';

/**
 * View that displays the headings outline for the current file.
 * @public
 * @unofficial
 */
export interface OutlineView extends InfoFileView {
    /** Create a DOM element for an outline heading item. */
    createItemDom(e: unknown): unknown;

    /** Filter the outline items based on the current search query. */
    filterSearchResults(): void;

    /** Find the heading that corresponds to the current cursor position. */
    findActiveHeading(e: unknown): unknown | undefined;

    /**
     * Finds the active leaf.
     */
    findCorrespondingLeaf(): WorkspaceLeaf | null;

    /**
     * Returns the headings of the active file.
     */
    getHeadings(): string[];

    /**
     * Finds the view to the active leaf.
     */
    getOwner(): View | null;

    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.Outline;

    /** Handle the collapse/expand all toggle action. */
    handleCollapseAll(e: unknown): void;

    /** Handle editor selection changes and highlight the active heading. */
    handleSelectionChange(): void;

    /** Handle a file content change and refresh the outline. */
    onFileChanged(file: TFile): void;

    /** Handle scroll events in the markdown editor and sync outline highlight. */
    onMarkdownScroll(e: unknown): void;

    /**
     * Toggles the visibility of the search.
     */
    onToggleShowSearch(): void;

    /** Set which outline item is highlighted as active. */
    setHighlightedItem(e: unknown): void;

    /** Set the visibility of the search filter. */
    setShowSearch(e: unknown): void;

    /**
     * Shows the search.
     */
    showSearch(): void;

    /** Refresh the outline view with current headings. */
    update(): void;

    /**
     * Updates the search.
     */
    updateSearch(): void;
}
