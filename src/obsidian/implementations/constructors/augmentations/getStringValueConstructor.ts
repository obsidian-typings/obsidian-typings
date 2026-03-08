import {
    StringValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the StringValue constructor.
 *
 * @returns The StringValue constructor.
 *
 * @public
 * @unofficial
 */
export function getStringValueConstructor(): ExtractConstructor<StringValue> {
    return StringValue as ExtractConstructor<StringValue>;
}
