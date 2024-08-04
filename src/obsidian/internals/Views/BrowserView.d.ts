import type { ItemView } from "obsidian";

/** @todo Documentation incomplete */
export interface BrowserView extends ItemView {
    /**
     * Get the current view type
     */
    getViewType(): "browser";
    /**
     * Toggles the reader mode
     */
    toggleReaderMode(): void;
    /**
     * Zoom in the webview
     */
    zoomIn(): void;
    /**
     * Zoom out the webview
     */
    zoomOut(): void;
    /**
     * Resets the zoom factor of the webview
     */
    zoomReset(): void;
    /** @todo Documentation incomplete */
    reportPageLoad(url: string, title: string, navigate: unknown): void;
    /** @todo Documentation incomplete */
    commitPageLoad(): unknown;
    /**
     * Setup the webview
     */
    instantiateWebView(): void;
    /**
     * Stores the title of the current webview
     */
    storeCurrentPageTitle(): Promise<unknown>;
    /**
     * Shows the error view
     */
    displayErrorView(): void;
    /**
     * Shows the webview
     */
    displayWebView(): void;
    /** @todo Documentation incomplete */
    configureWebContents(): void;
    /** @todo Documentation incomplete */
    getReaderModeContent(): Promise<unknown>;
    /** @todo Documentation incomplete */
    displayReaderView(): Promise<unknown>;
    /** @todo Documentation incomplete */
    displayBlank(): void;
    /** @todo Documentation incomplete */
    hideAll(): void;
    /** @todo Documentation incomplete */
    saveAsMarkdown(): Promise<unknown>;
    /** @todo Documentation incomplete */
    navigate(e: unknown, t: unknown): unknown;
    /** @todo Documentation incomplete */
    pushViewStackHistory(e: unknown): void;
    /** @todo Documentation incomplete */
    selectFavicon(e: unknown): unknown;
    /** @todo Documentation incomplete */
    setFavicon(e: unknown): unknown;
    /** @todo Documentation incomplete */
    contextMenuItemsForLink(e: unknown, t: unknown): unknown;
    /** @todo Documentation incomplete */
    contextMenuItemsForSelection(e: unknown, t: unknown): unknown;
    /** @todo Documentation incomplete */
    contextMenuItemsForImg(e: unknown): unknown;
    /** @todo Documentation incomplete */
    displayContextMenu(e: unknown): void;
    /** @todo Documentation incomplete */
    showSearch(): void;
    /** @todo Documentation incomplete */
    closeSearch(): void;
    /** @todo Documentation incomplete */
    onExternalLinkClick(e: unknown, t: unknown, n: unknown): void;
    /** @todo Documentation incomplete */
    onReaderModeContextMenu(e: unknown): void;
    /** @todo Documentation incomplete */
    onCheckboxClick(e: unknown, t: unknown, n: unknown): void;
    /** @todo Documentation incomplete */
    onFoldChange(): void;
    /** @todo Documentation incomplete */
    onScroll(): void;
    /** @todo Documentation incomplete */
    postProcess(e: unknown, t: unknown, n: unknown): void;
    /** @todo Documentation incomplete */
    onRenderComplete(): void;
    /** @todo Documentation incomplete */
    onInternalLinkClick(e: unknown, t: unknown, n: unknown): void;
    /** @todo Documentation incomplete */
    onInternalLinkRightClick(e: unknown, t: unknown, n: unknown): void;
    /** @todo Documentation incomplete */
    onInternalLinkDrag(e: unknown, t: unknown, n: unknown): void;
    /** @todo Documentation incomplete */
    onInternalLinkMouseover(e: unknown, t: unknown, n: unknown): void;
    /** @todo Documentation incomplete */
    onTagClick(e: unknown, t: unknown, n: unknown): void;
    /** @todo Documentation incomplete */
    onExternalLinkRightClick(e: unknown, t: unknown, n: unknown): void;
}
