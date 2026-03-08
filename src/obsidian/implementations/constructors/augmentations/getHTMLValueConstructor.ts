import {
    HTMLValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type HTMLValueConstructor = ExtractConstructor<HTMLValue>;

/**
 * Get the HTMLValue constructor.
 *
 * @returns The HTMLValue constructor.
 *
 * @public
 * @unofficial
 */
export function getHTMLValueConstructor(): HTMLValueConstructor {
    return HTMLValue as HTMLValueConstructor;
}
