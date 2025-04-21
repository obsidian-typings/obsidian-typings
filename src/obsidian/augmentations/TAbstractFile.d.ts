export {};

declare module 'obsidian' {
    /**
     * This can be either a {@link TFile} or a {@link TFolder}.
     */
    interface TAbstractFile {
        /**
         * Whether the file or folder is being deleted.
         *
         * @unofficial
         */
        deleted: boolean;

        /**
         * The name of the file.
         *
         * @official
         */
        name: string;

        /**
         * The parent folder of the file.
         *
         * @official
         */
        parent: TFolder | null;

        /**
         * The path of the file.
         *
         * @official
         */
        path: string;

        /**
         * The vault.
         *
         * @official
         */
        vault: Vault;

        /**
         * Gets the path after renaming the file or folder.
         *
         * @param newName The new name of the file or folder.
         * @returns The new path of the file or folder.
         * @unofficial
         */
        getNewPathAfterRename(newName: string): string;

        /**
         * @unofficial
         *
         * Sets the path of the file or folder.
         * @param path The new path of the file or folder.
         * @unofficial
         */
        setPath(path: string): void;
    }
}
