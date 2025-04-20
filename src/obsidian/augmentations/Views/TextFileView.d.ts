export {};

declare module 'obsidian' {
    interface TextFileView extends EditableFileView {
        /**
         * Whether current file is dirty (different from saved contents).
         *
         * @unofficial
         */
        dirty: boolean;

        /**
         * Whether editor should be rendered as plaintext.
         *
         * @unofficial
         */
        isPlaintext: boolean;

        /**
         * The data that was last saved.
         *
         * @unofficial
         */
        lastSavedData: null | string;

        /**
         * Whether on saving, the file should be saved again (for dirtiness checks).
         *
         * @unofficial
         */
        saveAgain: boolean;

        /**
         * Whether the file is currently saving.
         *
         * @unofficial
         */
        saving: boolean;

        /** @unofficial */
        loadFileInternal(file: TFile, clear: boolean): Promise<unknown>;

        /**
         * Is called when the vault has a 'modify' event. Reloads the file if the view is currently not saving the file and the modified file is the file in this view.
         *
         * @param file The modified file.
         * @unofficial
         */
        onModify(file: TFile): void;

        /**
         * Saves the opened file.
         *
         * @param clear If set clears the editor under certain conditions.
         * @unofficial
         */
        save(clear?: boolean): Promise<void>;

        /**
         * If any changes(dirty = true) in the file forces the file to save.
         *
         * @unofficial
         */
        saveImmediately(): void;

        /**
         * Set the data to the editor. This is used to load the file contents.
         *
         * @param data The new data.
         * @param clear If clear is set, then it means we're opening a completely different file. In that case, you should call clear(), or implement a slightly more efficient clearing mechanism given the new data to be set.
         * @unofficial
         */
        setData(data: string, clear: boolean): void;
    }
}
