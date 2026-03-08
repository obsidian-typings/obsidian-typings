import {
    IconValue
} from 'obsidian';
import type { IconValueConstructor } from '../../../internals/Constructors/augmentations/IconValueConstructor.ts';

/**
 * Get the IconValue constructor.
 *
 * @returns The IconValue constructor.
 *
 * @public
 * @unofficial
 */
export function getIconValueConstructor(): IconValueConstructor {
    return IconValue as unknown as IconValueConstructor;
}
