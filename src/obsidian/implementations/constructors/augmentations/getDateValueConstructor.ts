import {
    DateValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type DateValueConstructor = ExtractConstructor<DateValue>;

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
