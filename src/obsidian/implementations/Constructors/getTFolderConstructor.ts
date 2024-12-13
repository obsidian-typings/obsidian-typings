import {
    TFolder,
    type Vault
} from 'obsidian';

type TFolderConstructor = new(vault: Vault, path: string) => TFolder;

/**
 * Get the TFolder constructor.
 *
 * @returns The TFolder constructor.
 */
export function getTFolderConstructor(): TFolderConstructor {
    return TFolder as TFolderConstructor;
}
