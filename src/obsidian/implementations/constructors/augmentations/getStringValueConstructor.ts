import {
    StringValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type StringValueConstructor = ExtractConstructor<StringValue>;

/**
 * Get the StringValue constructor.
 *
 * @returns The StringValue constructor.
 *
 * @public
 * @unofficial
 */
export function getStringValueConstructor(): StringValueConstructor {
    return StringValue as StringValueConstructor;
}
