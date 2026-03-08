import type {
    BasesEntry,
    BasesEntryGroup
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The BasesEntryGroup constructor.
 *
 * @public
 * @unofficial
 */
export interface BasesEntryGroupConstructor extends ConstructorBase<[entries: BasesEntry[], key: unknown], BasesEntryGroup> {}
