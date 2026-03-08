import {
    ListValue
} from 'obsidian';
import type { ListValueConstructor } from '../../../internals/Constructors/augmentations/ListValueConstructor.ts';

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
