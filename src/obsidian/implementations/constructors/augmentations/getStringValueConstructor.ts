import {
    StringValue
} from 'obsidian';
import type { StringValueConstructor } from '../../../internals/constructors/augmentations/StringValueConstructor.ts';

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
