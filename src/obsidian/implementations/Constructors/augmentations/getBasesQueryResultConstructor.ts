import {
    BasesQueryResult
} from 'obsidian';
import type { BasesQueryResultConstructor } from '../../../internals/Constructors/augmentations/BasesQueryResultConstructor.ts';

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
