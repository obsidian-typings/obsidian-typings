import type { Vault, TFolder } from "obsidian";

/**
 * The TFolder constructor.
 *
 * @public
 */
export type TFolderConstructor = new (vault: Vault, path: string) => TFolder;
