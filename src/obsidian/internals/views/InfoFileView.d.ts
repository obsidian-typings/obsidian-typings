import type { FileView, TFile } from "obsidian";
/**
 * @todo This is probably not the right term
 */
export interface InfoFileView extends FileView {
    /**
     * Called when a file is opened. Loads the file and requests a content update
     * @param file The opened file
     */
    onFileOpen(file: TFile): void;
}
