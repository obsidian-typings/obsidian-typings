import type { ItemView } from "obsidian";
/** @todo Documentation incomplete */
export interface BrowserView extends ItemView {
    /**
     * Get the current view type
     * @returns "browser"
     */
    getViewType(): string;
    /** @internal */
    toggleReaderMode(): void;
    /** @internal */
    zoomIn(): void;
    /** @internal */
    zoomOut(): void;
    /** @internal */
    zoomReset(): void;
    /** @internal */
    reportPageLoad(e: unknown, t: unknown, n: unknown): void;
    /** @internal */
    commitPageLoad(): unknown;
    /** @internal */
    instantiateWebView(): void;
    /** @internal */
    storeCurrentPageTitle(): unknown;
    /** @internal */
    displayErrorView(): void;
    /** @internal */
    displayWebView(): void;
    /** @internal */
    configureWebContents(): void;
    /** @internal */
    getReaderModeContent(): unknown;
    /** @internal */
    displayReaderView(): unknown;
    /** @internal */
    displayBlank(): void;
    /** @internal */
    hideAll(): void;
    /** @internal */
    saveAsMarkdown(): unknown;
    /** @internal */
    navigate(e: unknown, t: unknown): unknown;
    /** @internal */
    pushViewStackHistory(e: unknown): void;
    /** @internal */
    selectFavicon(e: unknown): unknown;
    /** @internal */
    setFavicon(e: unknown): unknown;
    /** @internal */
    contextMenuItemsForLink(e: unknown, t: unknown): unknown;
    /** @internal */
    contextMenuItemsForSelection(e: unknown, t: unknown): unknown;
    /** @internal */
    contextMenuItemsForImg(e: unknown): unknown;
    /** @internal */
    displayContextMenu(e: unknown): void;
    /** @internal */
    showSearch(): void;
    /** @internal */
    closeSearch(): void;
    /** @internal */
    onExternalLinkClick(e: unknown, t: unknown, n: unknown): void;
    /** @internal */
    onReaderModeContextMenu(e: unknown): void;
    /** @internal */
    onCheckboxClick(e: unknown, t: unknown, n: unknown): void;
    /** @internal */
    onFoldChange(): void;
    /** @internal */
    onScroll(): void;
    /** @internal */
    postProcess(e: unknown, t: unknown, n: unknown): void;
    /** @internal */
    onRenderComplete(): void;
    /** @internal */
    onInternalLinkClick(e: unknown, t: unknown, n: unknown): void;
    /** @internal */
    onInternalLinkRightClick(e: unknown, t: unknown, n: unknown): void;
    /** @internal */
    onInternalLinkDrag(e: unknown, t: unknown, n: unknown): void;
    /** @internal */
    onInternalLinkMouseover(e: unknown, t: unknown, n: unknown): void;
    /** @internal */
    onTagClick(e: unknown, t: unknown, n: unknown): void;
    /** @internal */
    onExternalLinkRightClick(e: unknown, t: unknown, n: unknown): void;
}
