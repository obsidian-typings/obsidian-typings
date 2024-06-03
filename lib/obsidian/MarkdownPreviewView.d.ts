import { ReadViewRenderer } from "./ReadViewRenderer.d.ts";
import { MarkdownView } from "./MarkdownView.d.ts";

/** @todo Documentation incomplete */
export default interface MarkdownPreviewView {
    /**
     * Unique identifier for the rendered element
     */
    docId: string;
    /**
     * HTML renderer for the Markdown
     */
    renderer: ReadViewRenderer;
    search: null | unknown;
    type: "preview" | string;
    view: MarkdownView;

    applyFoldInfo(e: unknown): unknown;
    beforeUnload(): unknown;
    clear(): unknown;
    edit(e: unknown): unknown;
    foldAll(): unknown;
    getEphemeralState(e: unknown): unknown;
    getFoldInfo(): unknown;
    getSelection(): unknown;
    hide(): unknown;
    onFoldChange(): unknown;
    onRenderComplete(): unknown;
    onResize(): unknown;
    onScroll(): unknown;
    requestUpdateLinks(): unknown;
    setEphemeralState(e: unknown): unknown;
    show(): unknown;
    showSearch(): unknown;
    unfoldAll(): unknown;
    updateOptions(): unknown;
}
