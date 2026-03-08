import {
    DateValue
} from 'obsidian';
import type { DateValueConstructor } from '../../../internals/Constructors/augmentations/DateValueConstructor.ts';

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
