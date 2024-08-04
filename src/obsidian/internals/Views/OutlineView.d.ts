import type {
    TFile,
    View,
    WorkspaceLeaf
} from "obsidian";
import type { InfoFileView } from "./InfoFileView.js";

/** @todo Documentation incomplete */
/** @public */
export interface OutlineView extends InfoFileView {
    /**
     * Finds the active leaf
     */
    findCorrespondingLeaf(): WorkspaceLeaf | null;
    /** @todo Documentation incomplete */
    handleCollapseAll(e: unknown): void;
    /**
     * Get the current view type
     */
    getViewType(): "outline";
    /** @todo Documentation incomplete */
    findActiveHeading(e: unknown): unknown | undefined;
    /** @todo Documentation incomplete */
    setHighlightedItem(e: unknown): void;
    /**
     * Finds the view to the active leaf
     */
    getOwner(): View | null;
    /** @todo Documentation incomplete */
    onMarkdownScroll(e: unknown): void;
    /** @todo Documentation incomplete */
    onFileChanged(file: TFile): void;
    /** @todo Documentation incomplete */
    handleSelectionChange(): void;
    /** @todo Documentation incomplete */
    createItemDom(e: unknown): unknown;
    /** @todo Documentation incomplete */
    update(): void;
    /** @todo Documentation incomplete */
    filterSearchResults(): void;
    /**
     * Returns the headings of the active file
     */
    getHeadings(): string[];
    /**
     * Toggles the visibility of the search
     */
    onToggleShowSearch(): void;
    /**
     * Shows the search
     */
    showSearch(): void;
    /** @todo Documentation incomplete */
    setShowSearch(e: unknown): void;
    /**
     * Updates the search
     */
    updateSearch(): void;
}
