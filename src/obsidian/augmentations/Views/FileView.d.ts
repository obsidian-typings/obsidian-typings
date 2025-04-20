export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface FileView extends ItemView {
        /**
         * Whether the view may be run without an attached file.
         *
         * @unofficial
         */
        allowNoFile: boolean;

        /**
         * Determines whether the specified file extension can be opened in this view.
         *
         * @param extension The file extension to be evaluated.
         * @unofficial
         */
        canAcceptExtension(extension: string): boolean;

        /**
         * Get view state for sync plugin.
         *
         * @unofficial
         */
        getSyncViewState(): unknown;

        /**
             * Loads the file with the onLoadFile function.
             *
             * @param file The File to load.
             *
            @unofficial
             */
        loadFile(file: TFile): Promise<unknown>;

        /**
         * Updates the view if it contains the deleted file.
         *
         * @param file The file that is deleted.
         * @unofficial
         */
        onDelete(file: TFile): Promise<void>;

        /**
         * Is called when a file get loaded.
         *
         * @param file The file that is loaded.
         * @unofficial
         */
        onLoadFile(file: TFile): Promise<void>;

        /**
         * Updates the view information based on the new file name.
         *
         * @param file The file that is renamed.
         * @unofficial
         */
        onRename(file: TFile): Promise<void>;

        /**
         * Is called when a file get unloaded.
         *
         * @param file The file that is unloaded.
         * @unofficial
         */
        onUnloadFile(file: TFile): Promise<void>;

        /** @unofficial */
        renderBreadcrumbs(): void;

        /** @unofficial */
        syncState(e: boolean): Promise<unknown>;
    }
}
