import {
    IconValue
} from 'obsidian';
import type { IconValueConstructor } from '../../../internals/constructors/augmentations/IconValueConstructor.d.ts';

/**
 * Get the IconValue constructor.
 *
 * @returns The IconValue constructor.
 *
 * @public
 * @unofficial
 */
export function getIconValueConstructor(): IconValueConstructor {
    return IconValue as IconValueConstructor;
}
