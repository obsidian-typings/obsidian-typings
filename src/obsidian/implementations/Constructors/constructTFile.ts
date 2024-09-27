import {
    TFile,
    type Vault
} from 'obsidian';

type TFileConstructor = new (vault: Vault, path: string) => TFile;

/**
 * Constructs a new TFile instance.
 *
 * @param vault - The vault to which the file belongs.
 * @param path - The path of the file.
 * @returns The constructed TFile instance.
 */
export function constructTFile(vault: Vault, path: string): TFile {
    return new (TFile as TFileConstructor)(vault, path);
}
