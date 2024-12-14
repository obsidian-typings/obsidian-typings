import type {
    TFolder,
    Vault
} from 'obsidian';

/**
 * The TFolder constructor.
 *
 * @public
 */
export type TFolderConstructor = new(vault: Vault, path: string) => TFolder;
