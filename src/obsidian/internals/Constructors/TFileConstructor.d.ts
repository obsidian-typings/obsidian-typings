import type {
    TFile,
    Vault
} from 'obsidian';

/**
 * The TFile constructor.
 *
 * @public
 */
export type TFileConstructor = new(vault: Vault, path: string) => TFile;
