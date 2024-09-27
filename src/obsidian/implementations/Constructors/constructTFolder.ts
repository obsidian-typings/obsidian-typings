import {
    TFolder,
    type Vault
} from 'obsidian';

type TFolderConstructor = new (vault: Vault, path: string) => TFolder;

/**
 * Constructs a new TFolder instance.
 *
 * @param vault - The vault to which the folder belongs.
 * @param path - The path of the folder.
 * @returns The constructed TFolder instance.
 */
export function constructTFolder(vault: Vault, path: string): TFolder {
    return new (TFolder as TFolderConstructor)(vault, path);
}
