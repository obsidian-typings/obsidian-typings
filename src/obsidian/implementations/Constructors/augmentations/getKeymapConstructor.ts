import {
    Keymap
} from 'obsidian';
import type { KeymapConstructor } from '../../../internals/Constructors/augmentations/KeymapConstructor.ts';

/**
 * Get the Keymap constructor.
 *
 * @returns The Keymap constructor.
 *
 * @public
 * @unofficial
 */
export function getKeymapConstructor(): KeymapConstructor {
    return Keymap as KeymapConstructor;
}
