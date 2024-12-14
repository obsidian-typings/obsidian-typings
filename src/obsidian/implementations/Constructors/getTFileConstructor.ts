import {
    TFile,
    type Vault
} from 'obsidian';

type TFileConstructor = new(vault: Vault, path: string) => TFile;

/**
 * Get the TFile constructor.
 *
 * @returns The TFile constructor.
 * @public
 */
export function getTFileConstructor(): TFileConstructor {
    return TFile as TFileConstructor;
}
