import type {
    TFolder,
    Vault
} from 'obsidian';
import type { ConstructorBase } from './ConstructorBase.d.ts';

/**
 * The TFolder constructor.
 *
 * @public
 * @unofficial
 */
export interface TFolderConstructor extends ConstructorBase<[vault: Vault, path: string], TFolder> {}
