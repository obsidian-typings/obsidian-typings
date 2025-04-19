export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface FileView extends ItemView {
        /**
         * Whether the view may be run without an attached file.
         */
        allowNoFile: boolean;

        /**
         * Determines whether the specified file extension can be opened in this view.
         * @param extension The file extension to be evaluated.
         */
        canAcceptExtension(extension: string): boolean;
        /**
         * Get view state for sync plugin.
         */
        getSyncViewState(): unknown;
        /**
         * Loads the file with the onLoadFile function.
         * @param file The File to load.
         */
        loadFile(file: TFile): Promise<unknown>;
        /**
         * Updates the view if it contains the deleted file.
         * @param file The file that is deleted.
         */
        onDelete(file: TFile): Promise<void>;
        /**
         * Is called when a file get loaded.
         * @param file The file that is loaded.
         */
        onLoadFile(file: TFile): Promise<void>;
        /**
         * Updates the view information based on the new file name.
         * @param file The file that is renamed.
         */
        onRename(file: TFile): Promise<void>;
        /**
         * Is called when a file get unloaded.
         * @param file The file that is unloaded.
         */
        onUnloadFile(file: TFile): Promise<void>;
        /** @todo Documentation incomplete */
        renderBreadcrumbs(): void;
        /** @todo Documentation incomplete */
        syncState(e: boolean): Promise<unknown>;
    }
}
