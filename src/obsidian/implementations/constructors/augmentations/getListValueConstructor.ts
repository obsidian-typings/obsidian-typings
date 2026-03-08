import {
    ListValue
} from 'obsidian';
import type { ListValueConstructor } from '../../../internals/constructors/augmentations/ListValueConstructor.d.ts';

/**
 * Get the ListValue constructor.
 *
 * @returns The ListValue constructor.
 *
 * @public
 * @unofficial
 */
export function getListValueConstructor(): ListValueConstructor {
    return ListValue as ListValueConstructor;
}
