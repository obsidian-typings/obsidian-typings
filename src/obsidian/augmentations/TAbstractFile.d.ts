export {};

declare module 'obsidian' {
    interface TAbstractFile {
        /**
         * Whether the file or folder is being deleted.
         *
         * @unofficial
         */
        deleted: boolean;

        /**
         * Gets the path after renaming the file or folder.
         *
         * @param newName The new name of the file or folder.
         * @returns The new path of the file or folder.
         *
         * @unofficial
         */
        getNewPathAfterRename(newName: string): string;
        /**
         * @unofficial
         *
         * Sets the path of the file or folder.
         * @param path The new path of the file or folder.
         *
         * @unofficial
         */
        setPath(path: string): void;
    }
}
