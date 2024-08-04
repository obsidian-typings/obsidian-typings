import type { InfoFileView } from "../views/InfoFileView.js";
import type { TFile } from "obsidian";
/** @todo Documentation incomplete */
export interface FilePropertiesView extends InfoFileView {
    /**
     * Returns the file
     */
    getFile(): TFile;
    /** @todo Documentation incomplete */
    shiftFocusAfter(): void;
    /** @todo Documentation incomplete */
    shiftFocusBefore(): void;
    /** @todo Documentation incomplete */
    saveFrontmatter(e: unknown): void;
    /**
     * Checks the file is an markdown file
     * @param file The file to check
     */
    isSupportedFile(file: TFile): boolean;
    /**
     * Reads the file if it is supported
     * @param file The file to read
     */
    readSupportedFile(file: TFile): Promise<unknown>;
    /** @todo Documentation incomplete */
    onQuickPreview(file: TFile, t: unknown): void;
    /** @todo Documentation incomplete */
    onFileChange(file: TFile): Promise<unknown>;
    /**
     * Get the current view type
     */
    getViewType(): "file-properties";
    /** @todo Documentation incomplete */
    updateFrontmatter(file: TFile, t: unknown): unknown;
    /** @todo Documentation incomplete */
    updateEmptyState(): void;
    /** @todo Documentation incomplete */
    update(): void;
}
