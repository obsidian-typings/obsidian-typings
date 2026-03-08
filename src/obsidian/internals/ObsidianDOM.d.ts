/**
 * Core DOM elements of the Obsidian application layout.
 * @public
 * @unofficial
 */
export interface ObsidianDOM {
    /**
     * Root element of the application.
     */
    appContainerEl: HTMLElement;

    /**
     * Child of `appContainerEl` containing the main content of the application.
     */
    horizontalMainContainerEl: HTMLElement;

    /**
     * Status bar element containing word count among other things.
     */
    statusBarEl: HTMLElement;

    /**
     * Child of `horizontalMainContainerEl` containing the workspace DOM.
     */
    workspaceEl: HTMLElement;

    /**
     * Constructor.
     *
     * @param containerEl - The containerEl.
     * @returns The new instance.
     * To get the constructor, use `getObsidianDOMConstructor()` from `obsidian-typings/implementations`.
     */
    constructor__(containerEl: HTMLElement): this;
}
