import type { TFile } from "obsidian";

/** @todo Documentation incomplete */
export default interface EditableFileView {
    /**
     * The file that is currently being renamed
     */
    fileBeingRenamed: null | TFile;
}
