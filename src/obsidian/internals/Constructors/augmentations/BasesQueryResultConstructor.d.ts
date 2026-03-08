import type {
    BasesQueryResult,
    QueryController
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The BasesQueryResult constructor.
 *
 * @public
 * @unofficial
 */
export interface BasesQueryResultConstructor extends ConstructorBase<[controller: QueryController], BasesQueryResult> {}
