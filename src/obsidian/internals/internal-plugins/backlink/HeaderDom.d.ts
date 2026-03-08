import type { App } from 'obsidian';

/**
 * Renders navigation buttons and sort controls for a section header in the backlink view.
 * @public
 * @unofficial
 */
export interface HeaderDom {
    /**
     * Add a navigation button to the header.
     *
     * @returns The created navigation button element.
     */
    addNavButton(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

    /**
     * Add a sort button to the header.
     *
     * @returns The created sort button element.
     */
    addSortButton(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

    /** Reference to the app. */
    app: App;

    /** Container element for navigation buttons. */
    navButtonsEl: HTMLDivElement;

    /** Container element for the navigation header. */
    navHeaderEl: HTMLDivElement;
}
