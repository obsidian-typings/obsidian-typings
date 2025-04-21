export {};

declare module 'obsidian' {
    /**
     * A folder.
     */
    interface TFolder extends TAbstractFile {
        /**
         * The children of the folder.
         *
         * @official
         */
        children: TAbstractFile[];

        /**
         * Gets the count of files in the folder.
         *
         * @returns The number of files in the folder.
         * @unofficial
         */
        getFileCount(): number;

        /**
         * Gets the count of subfolders in the folder.
         *
         * @returns The number of subfolders in the folder.
         * @unofficial
         */
        getFolderCount(): number;

        /**
         * Returns the prefix of the folder path.
         *
         * If the folder is in the root '/', it returns an empty string.
         * If the folder is 'a/b/c', it returns 'a/b/'.
         *
         * @returns The prefix of the folder.
         * @unofficial
         */
        getParentPrefix(): string;

        /**
         * Check if the folder is the root folder.
         *
         * @returns Whether the folder is the root folder.
         * @official
         */
        isRoot(): boolean;
    }
}
