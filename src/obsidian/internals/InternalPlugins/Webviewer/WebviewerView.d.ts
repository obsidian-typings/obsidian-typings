import type { ItemView } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.ts';

/**
 * View that renders an embedded web browser for browsing web pages within Obsidian.
 * @public
 * @unofficial
 */
export interface WebviewerView extends ItemView {
    /** Close the in-page search bar. */
    closeSearch(): void;

    /** Finalize and commit the current page load. */
    commitPageLoad(): unknown;

    /** Configure the web contents settings for the webview. */
    configureWebContents(): void;

    /** Build context menu items for an image element. */
    contextMenuItemsForImg(e: unknown): unknown;

    /** Build context menu items for a link element. */
    contextMenuItemsForLink(e: unknown, t: unknown): unknown;

    /** Build context menu items for selected text. */
    contextMenuItemsForSelection(e: unknown, t: unknown): unknown;

    /** Display a blank page in the webview. */
    displayBlank(): void;

    /** Display a context menu at the given position. */
    displayContextMenu(e: unknown): void;

    /**
     * Shows the error view.
     */
    displayErrorView(): void;

    /** Display the page content in reader mode. */
    displayReaderView(): Promise<unknown>;

    /**
     * Shows the webview.
     */
    displayWebView(): void;

    /** Get the parsed content for reader mode. */
    getReaderModeContent(): Promise<unknown>;

    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.Webviewer;

    /** Hide all view content (webview, reader, error). */
    hideAll(): void;

    /**
     * Setup the webview.
     */
    instantiateWebView(): void;

    /** Navigate the webview to a URL. */
    navigate(e: unknown, t: unknown): unknown;

    /** Handle a checkbox click in reader mode. */
    onCheckboxClick(e: unknown, t: unknown, n: unknown): void;

    /** Handle a click on an external link. */
    onExternalLinkClick(e: unknown, t: unknown, n: unknown): void;

    /** Handle a right-click on an external link. */
    onExternalLinkRightClick(e: unknown, t: unknown, n: unknown): void;

    /** Handle a fold/collapse state change in reader mode. */
    onFoldChange(): void;

    /** Handle a click on an internal (vault) link. */
    onInternalLinkClick(e: unknown, t: unknown, n: unknown): void;

    /** Handle dragging an internal link. */
    onInternalLinkDrag(e: unknown, t: unknown, n: unknown): void;

    /** Handle mouseover on an internal link for preview. */
    onInternalLinkMouseover(e: unknown, t: unknown, n: unknown): void;

    /** Handle a right-click on an internal link. */
    onInternalLinkRightClick(e: unknown, t: unknown, n: unknown): void;

    /** Handle a context menu event in reader mode. */
    onReaderModeContextMenu(e: unknown): void;

    /** Called when the reader mode rendering is complete. */
    onRenderComplete(): void;

    /** Handle scroll events in the webview. */
    onScroll(): void;

    /** Handle a click on a tag in reader mode. */
    onTagClick(e: unknown, t: unknown, n: unknown): void;

    /** Post-process rendered content in reader mode. */
    postProcess(e: unknown, t: unknown, n: unknown): void;

    /** Push the current page to the view navigation history stack. */
    pushViewStackHistory(e: unknown): void;

    /** Report a page load event to the history database. */
    reportPageLoad(url: string, title: string, navigate: unknown): void;

    /** Save the current page content as a Markdown file. */
    saveAsMarkdown(): Promise<unknown>;

    /** Select the appropriate favicon for the current page. */
    selectFavicon(e: unknown): unknown;

    /** Set the favicon for the current page. */
    setFavicon(e: unknown): unknown;

    /** Show the in-page search bar. */
    showSearch(): void;

    /**
     * Stores the title of the current webview.
     */
    storeCurrentPageTitle(): Promise<unknown>;

    /**
     * Toggles the reader mode.
     */
    toggleReaderMode(): void;

    /**
     * Zoom in the webview.
     */
    zoomIn(): void;

    /**
     * Zoom out the webview.
     */
    zoomOut(): void;

    /**
     * Resets the zoom factor of the webview.
     */
    zoomReset(): void;
}
