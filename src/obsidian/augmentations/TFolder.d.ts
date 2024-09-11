export {};

declare module 'obsidian' {
    interface TFolder extends TAbstractFile {
        /**
         * Gets the count of files in the folder.
         *
         * @returns The number of files in the folder.
         */
        getFileCount(): number;
        /**
         * Gets the count of subfolders in the folder.
         *
         * @returns The number of subfolders in the folder.
         */
        getFolderCount(): number;
        /**
         * Returns the prefix of the folder path.
         * If the folder is in the root '/', it returns an empty string.
         * If the folder is 'a/b/c', it returns 'a/b/'.
         *
         * @returns The prefix of the folder.
         */
        getParentPrefix(): string;
    }
}
