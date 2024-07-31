export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface EditableFileView extends FileView {
        /**
         * The file that is currently being renamed
         */
        fileBeingRenamed: null | TFile;
    }
}
