import {
    HTMLValue
} from 'obsidian';
import type { HTMLValueConstructor } from '../../../internals/constructors/augmentations/HTMLValueConstructor.d.ts';

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
