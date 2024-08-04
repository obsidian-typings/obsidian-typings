import type {
    Editor,
    EditorRange
} from "obsidian";
import type { AbstractSearchComponent } from "../internals/AbstractSearchComponent.js";
import type { SearchCursor } from "../internals/SearchCursor.js";

/** @public */
export interface EditorSearchComponent extends AbstractSearchComponent {
    /**
     * Search cursor for editor, handles search and replace functionality for editor
     */
    cursor: null | SearchCursor;
    /**
     * Linked editor for search component
     */
    editor: Editor;
    /**
     * Whether search component is currently rendering
     */
    isActive: boolean;
    /**
     * Whether search component is replacing text (includes "Replace" input field)
     */
    isReplace: boolean;

    /**
     * Remove all highlights from editor
     */
    clear(): void;
    /**
     * Find next search results from cursor and highlights it
     */
    findNext(): void;
    /**
     * Replace cursor with replacement string if not null and moves to next search result
     */
    findNextOrReplace(): void;
    /**
     * Find previous search results from cursor and highlights it
     */
    findPrevious(): void;
    /**
     * Hide/detaches the search component and removes cursor highlights
     */
    hide(): void;
    /**
     * Add highlights for specified ranges
     *
     * @remark Invokes editor.addHighlights
     */
    highlight(ranges: EditorRange[]): void;
    /**
     * Highlights all matches if search element focused
     */
    onAltEnter(e?: KeyboardEvent): void;
    /**
     * Replace all search results with specified text if replace mode and replacement element is focused
     */
    onModAltEnter(e?: KeyboardEvent): void;
    /**
     * Updates search cursor on new input query and highlights search results
     */
    onSearchInput(): void;
    /**
     * Replaces all search results with replacement query
     */
    replaceAll(): void;
    /**
     * Replace current search result, if any, with replacement query
     */
    replaceCurrentMatch(): void;
    /**
     * Find all matches of search query and highlights them
     */
    searchAll(): void;
    /**
     * Reveal the search (and replace) component
     */
    show(replace: boolean): void;
}
