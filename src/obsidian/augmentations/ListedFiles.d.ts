export {};

declare module 'obsidian' {
    /**
     * Listed content of the folder.
     */
    interface ListedFiles {
        /**
         * List of files in the folder.
         *
         * @official
         */
        files: string[];

        /**
         * List of subfolders in the folder.
         *
         * @official
         */
        folders: string[];
    }
}
