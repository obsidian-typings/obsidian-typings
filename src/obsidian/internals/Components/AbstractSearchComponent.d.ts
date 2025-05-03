import type {
    App,
    Scope
} from 'obsidian';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface AbstractSearchComponent {
    /**
     * Reference to the app.
     */
    app: App;

    /**
     * The container element in which the search component exists (i.e. Editor).
     */
    containerEl: HTMLElement;

    /**
     * Container for the replacement input field.
     */
    replaceInputEl: HTMLInputElement;

    /**
     * Keyscope for search component.
     */
    scope: Scope;

    /**
     * Container for all the action buttons.
     */
    searchButtonContainerEl: HTMLElement;

    /**
     * Container for the search component itself.
     */
    searchContainerEl: HTMLElement;

    /**
     * Container for the search input field.
     */
    searchInputEl: HTMLInputElement;

    /**
     * Returns the current search query.
     */
    getQuery(): string;

    /**
     * Switch to the next inputElement.
     */
    goToNextInput(event: KeyboardEvent): unknown;

    /**
     * Invokes findNextOrReplace.
     */
    onEnter(event: KeyboardEvent): unknown;

    /**
     * Invokes findPrevious.
     */
    onShiftEnter(event: KeyboardEvent): unknown;
}
