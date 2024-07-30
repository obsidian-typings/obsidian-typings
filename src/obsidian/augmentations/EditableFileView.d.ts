export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface EditableFileView {
        /**
         * The file that is currently being renamed
         */
        fileBeingRenamed: null | TFile;
    }
}
