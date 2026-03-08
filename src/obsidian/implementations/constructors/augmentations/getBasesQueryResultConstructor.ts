import {
    BasesQueryResult
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type BasesQueryResultConstructor = ExtractConstructor<BasesQueryResult>;

/**
 * Get the BasesQueryResult constructor.
 *
 * @returns The BasesQueryResult constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesQueryResultConstructor(): BasesQueryResultConstructor {
    return BasesQueryResult as BasesQueryResultConstructor;
}
