export {};

declare module 'obsidian' {
    /**
     * This class implements a plaintext-based editable file view, which can be loaded and saved given an editor.
     *
     * Note that by default, this view only saves when it's closing. To implement auto-save, your editor should
     * call `this.requestSave()` when the content is changed.
     */
    interface TextFileView extends EditableFileView {
        /**
         * In-memory data.
         *
         * @official
         */
        data: string;

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
         * Debounced save in 2 seconds from now.
         *
         * @official
         */
        requestSave: () => void;

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

        /**
         * Clear the editor. This is usually called when we're about to open a completely.
         * different file, so it's best to clear any editor states like undo-redo history,
         * and any caches/indexes associated with the previous file contents.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link clear} instead.
         */
        clear__?(): void;

        /**
         * Create a new text file view.
         *
         * @param leaf - The leaf to create the view in.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(leaf: WorkspaceLeaf): this;

        /**
         * Gets the data from the editor. This will be called to save the editor contents to the file.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getViewData} instead.
         */
        getViewData__?(): string;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        loadFileInternal(file: TFile, clear: boolean): Promise<unknown>;

        /**
         * On load file.
         *
         * @param file - The file to load.
         * @returns The promise that resolves when the file is loaded.
         * @official
         */
        onLoadFile(file: TFile): Promise<void>;

        /**
         * Is called when the vault has a 'modify' event. Reloads the file if the view is currently not saving the file and the modified file is the file in this view.
         *
         * @param file The modified file.
         * @unofficial
         */
        onModify(file: TFile): void;

        /**
         * On unload file.
         *
         * @param file - The file to unload.
         * @returns The promise that resolves when the file is unloaded.
         * @official
         */
        onUnloadFile(file: TFile): Promise<void>;

        /**
         * Save the file.
         *
         * @param clear - Whether to clear the file.
         * @returns The promise that resolves when the file is saved.
         * @official
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

        /**
         * Set the data to the editor. This is used to load the file contents.
         *
         * If `clear` is set, then it means we're opening a completely different file.
         * In that case, you should call {@link TextFileView.clear}(), or implement a slightly more efficient
         * clearing mechanism given the new data to be set.
         *
         * @param data - The data to set.
         * @param clear - Whether to clear the file.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link setViewData} instead.
         */
        setViewData__(data: string, clear: boolean): void;
    }
}
