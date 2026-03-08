export {};

declare module 'obsidian' {
    /**
     * A text input allowing selection of a folder from in the vault.
     *
     * @since 1.10.2
     */
    interface BasesFolderOption extends BasesOption {
        /**
         * The default value of the option.
         *
         * @official
         * @since 1.10.2
         */
        default?: string;

        /**
         * Filter the folders to be displayed in the folder picker.
         *
         * @param folder - The folder to filter.
         * @returns `true` if the folder should be displayed, `false` otherwise.
         * @official
         * @since 1.10.2
         */
        filter?: (folder: TFolder) => boolean;

        /**
         * The placeholder of the option.
         *
         * @official
         * @since 1.10.2
         */
        placeholder?: string;

        /**
         * The type of the option.
         *
         * @official
         * @since 1.10.2
         */
        type: 'folder';
    }
}
