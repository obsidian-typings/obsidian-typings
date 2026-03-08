import {
    StringValue
} from 'obsidian';
import type { StringValueConstructor } from '../../../internals/Constructors/augmentations/StringValueConstructor.ts';

/**
 * Get the StringValue constructor.
 *
 * @returns The StringValue constructor.
 *
 * @public
 * @unofficial
 */
export function getStringValueConstructor(): StringValueConstructor {
    return StringValue as unknown as StringValueConstructor;
}
