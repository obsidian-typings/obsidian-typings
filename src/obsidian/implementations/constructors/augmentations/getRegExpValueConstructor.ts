import {
    RegExpValue
} from 'obsidian';
import type { RegExpValueConstructor } from '../../../internals/constructors/augmentations/RegExpValueConstructor.d.ts';

/**
 * Get the RegExpValue constructor.
 *
 * @returns The RegExpValue constructor.
 *
 * @public
 * @unofficial
 */
export function getRegExpValueConstructor(): RegExpValueConstructor {
    return RegExpValue as RegExpValueConstructor;
}
