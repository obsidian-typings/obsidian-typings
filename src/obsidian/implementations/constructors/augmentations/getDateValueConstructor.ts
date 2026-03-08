import {
    DateValue
} from 'obsidian';
import type { DateValueConstructor } from '../../../internals/constructors/augmentations/DateValueConstructor.ts';

/**
 * Get the DateValue constructor.
 *
 * @returns The DateValue constructor.
 *
 * @public
 * @unofficial
 */
export function getDateValueConstructor(): DateValueConstructor {
    return DateValue as DateValueConstructor;
}
