import type {
    FileView,
    TFile
} from 'obsidian';

/**
 * Info file view.
 *
 * @remark This is probably not the right term.
 * @public
 * @unofficial
 */
export interface InfoFileView extends FileView {
    /**
     * Called when a file is opened. Loads the file and requests a content update.
     *
     * @param file - The opened file.
     */
    onFileOpen(file: TFile): void;
}
