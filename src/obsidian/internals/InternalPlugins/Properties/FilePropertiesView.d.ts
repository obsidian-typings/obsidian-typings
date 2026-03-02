import type { TFile } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';
import type { InfoFileView } from '../../Views/InfoFileView.d.ts';

/**
 * View that displays frontmatter properties for the current file.
 * @public
 * @unofficial
 */
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
     *
     * @param file - The file to check.
     */
    isSupportedFile(file: TFile): boolean;

    /** Handle a file content change and refresh properties. */
    onFileChange(file: TFile): Promise<unknown>;

    /** Handle a quick preview update for the file. */
    onQuickPreview(file: TFile, t: unknown): void;

    /**
     * Reads the file if it is supported.
     *
     * @param file - The file to read.
     */
    readSupportedFile(file: TFile): Promise<unknown>;

    /** Save the modified frontmatter data to the file. */
    saveFrontmatter(e: unknown): void;

    /** Move focus to the next property field. */
    shiftFocusAfter(): void;

    /** Move focus to the previous property field. */
    shiftFocusBefore(): void;

    /** Refresh the file properties view. */
    update(): void;

    /** Update the empty state display when no properties exist. */
    updateEmptyState(): void;

    /** Update the frontmatter of a file with new property data. */
    updateFrontmatter(file: TFile, t: unknown): unknown;
}
