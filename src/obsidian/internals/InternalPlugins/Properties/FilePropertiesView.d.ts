import type { TFile } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';
import type { InfoFileView } from '../../Views/InfoFileView.d.ts';

/** @todo Documentation incomplete */
/** @public @unofficial */
export interface FilePropertiesView extends InfoFileView {
    /**
     * Returns the file.
     */
    getFile(): TFile;
    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.FileProperties;
    /**
     * Checks the file is an markdown file.
     * @param file - The file to check.
     */
    isSupportedFile(file: TFile): boolean;
    /** @todo Documentation incomplete */
    onFileChange(file: TFile): Promise<unknown>;
    /** @todo Documentation incomplete */
    onQuickPreview(file: TFile, t: unknown): void;
    /**
     * Reads the file if it is supported.
     * @param file - The file to read.
     */
    readSupportedFile(file: TFile): Promise<unknown>;
    /** @todo Documentation incomplete */
    saveFrontmatter(e: unknown): void;
    /** @todo Documentation incomplete */
    shiftFocusAfter(): void;
    /** @todo Documentation incomplete */
    shiftFocusBefore(): void;
    /** @todo Documentation incomplete */
    update(): void;
    /** @todo Documentation incomplete */
    updateEmptyState(): void;
    /** @todo Documentation incomplete */
    updateFrontmatter(file: TFile, t: unknown): unknown;
}
