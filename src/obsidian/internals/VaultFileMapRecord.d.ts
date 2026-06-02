import type { TAbstractFile } from 'obsidian';

/**
 * Record mapping file paths to their {@link obsidian#TAbstractFile} instances in the vault.
 *
 * @public
 * @unofficial
 */
export interface VaultFileMapRecord extends Record<string, TAbstractFile> {}
