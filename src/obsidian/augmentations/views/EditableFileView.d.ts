export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface EditableFileView extends FileView {
        /**
         * The file that is currently being renamed
         */
        fileBeingRenamed: null | TFile;

        /** @internal */
        onTitleBlur(): unknown;
        /** @internal */
        onTitleChange(e: unknown): void;
        /** @internal */
        onTitleFocus(): void;
        /** @internal */
        onTitleKeydown(e: unknown): void;
        /** @internal */
        onTitlePaste(e: unknown, t: unknown): void;
        /** @internal */
        saveTitle(e: unknown): unknown;
    }
}
