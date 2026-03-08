import type {
    BasesEntry,
    TFile
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The BasesEntry constructor.
 *
 * @public
 * @unofficial
 */
export interface BasesEntryConstructor extends ConstructorBase<[ctx: unknown, file: TFile], BasesEntry> {}
