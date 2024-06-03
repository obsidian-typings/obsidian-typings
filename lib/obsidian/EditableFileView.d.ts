import { TFile } from "./TFile.d.ts";

/** @todo Documentation incomplete */
export default interface EditableFileView {
    /**
     * The file that is currently being renamed
     */
    fileBeingRenamed: null | TFile;
}
