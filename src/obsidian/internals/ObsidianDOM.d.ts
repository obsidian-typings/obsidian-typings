import type { getObsidianDOMConstructor } from '../implementations/constructors/internals/getObsidianDOMConstructor.d.ts';
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
     * To get the constructor instance, use {@link getObsidianDOMConstructor} from `obsidian-typings/implementations`.
     *
     * @param containerEl - The containerEl.
     * @returns The new instance.
     * @deprecated - Added only for typing purposes.
     */
    constructor__(containerEl: HTMLElement): this;
}
