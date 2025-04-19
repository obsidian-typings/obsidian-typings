import type {
    TFile,
    Vault
} from 'obsidian';
import type { ConstructorBase } from './ConstructorBase.d.ts';

/**
 * The TFile constructor.
 *
 * @public @unofficial
 */
export interface TFileConstructor extends ConstructorBase<[vault: Vault, path: string], TFile> {}
