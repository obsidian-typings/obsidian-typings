import type { EditableFileView } from "obsidian";
/** @todo Documentation incomplete */
export interface PdfView extends EditableFileView {
    viewer: unknown;

    /**
     * Get the current view type
     */
    getViewType(): "pdf";
    /** @internal */
    onModify(e: unknown): void;
    /** @internal */
    showSearch(): void;
}
