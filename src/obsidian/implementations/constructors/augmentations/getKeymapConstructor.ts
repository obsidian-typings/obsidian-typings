import {
    Keymap
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the Keymap constructor.
 *
 * @returns The Keymap constructor.
 *
 * @public
 * @unofficial
 */
export function getKeymapConstructor(): ExtractConstructor<Keymap> {
    return Keymap as ExtractConstructor<Keymap>;
}
