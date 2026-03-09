import type {
    getTAbstractFileConstructor
} from '../implementations/constructors/augmentations/getTAbstractFileConstructor.d.ts';

export {};

declare module 'obsidian' {
    /**
     * This can be either a {@link TFile} or a {@link TFolder}.
     * @since 0.9.7
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
         * @since 0.9.7
         */
        name: string;

        /**
         * The parent folder of the file.
         *
         * @official
         * @since 0.9.7
         */
        parent: TFolder | null;

        /**
         * The path of the file.
         *
         * @official
         * @since 0.9.7
         */
        path: string;

        /**
         * The vault.
         *
         * @official
         * @since 0.9.7
         */
        vault: Vault;

        /**
         * Constructor.
         *
         * To extract the constructor type, use `ExtractConstructor<TAbstractFile>`.
         *
         * @param vault - The vault.
         * @param path - The path.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor__(vault: Vault, path: string): this;

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
