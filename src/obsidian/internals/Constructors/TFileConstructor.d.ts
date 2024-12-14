import type { Vault, TFile } from "obsidian";

/**
 * The TFile constructor.
 *
 * @public
 */
export type TFileConstructor = new (vault: Vault, path: string) => TFile;
