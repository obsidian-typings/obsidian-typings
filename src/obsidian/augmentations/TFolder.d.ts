export {};

declare module 'obsidian' {
    /**
     * A folder.
     * @since 0.9.7
     */
    interface TFolder extends TAbstractFile {
        /**
         * The children of the folder.
         *
         * @official
         * @since 0.9.7
         */
        children: TAbstractFile[];

        /**
         * Constructor.
         *
         * @param vault - The vault.
         * @param path - The path.
         * @returns The new instance.
         * To get the constructor, use `getTFolderConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor__(vault: Vault, path: string): this;

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
         * @since 0.9.7
         */
        isRoot(): boolean;
}
}
