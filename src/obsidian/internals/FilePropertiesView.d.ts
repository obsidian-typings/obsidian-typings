import type { InfoFileView } from "../types.js";
/** @todo Documentation incomplete */
export interface FilePropertiesView extends InfoFileView {
    /** @internal */
    getFile(): unknown;
    /** @internal */
    shiftFocusAfter(): void;
    /** @internal */
    shiftFocusBefore(): void;
    /** @internal */
    saveFrontmatter(e: unknown): void;
    /** @internal */
    isSupportedFile(e: unknown): boolean;
    /** @internal */
    readSupportedFile(e: unknown): unknown;
    /** @internal */
    onQuickPreview(e: unknown, t: unknown): void;
    /** @internal */
    onFileChange(e: unknown): unknown;
    /**
     * Get the current view type
     * @returns "file-properties"
     */
    getViewType(): string;
    /** @internal */
    updateFrontmatter(e: unknown, t: unknown): unknown;
    /** @internal */
    updateEmptyState(): void;
    /** @internal */
    update(): void;
}
