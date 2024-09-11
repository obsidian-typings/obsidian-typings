export {};

declare module "obsidian" {
    interface TAbstractFile {
        /**
         * Whether the file or folder is being deleted
         */
        deleted: boolean;

        /**
         * Gets the path after renaming the file or folder.
         * @param newName The new name of the file or folder.
         *
         * @returns The new path of the file or folder.
         */
        getNewPathAfterRename(newName: string): string;

        /**
         * @internal
         *
         * Sets the path of the file or folder.
         *
         * @param path The new path of the file or folder.
         */
        setPath(path: string): void;
    }
}
