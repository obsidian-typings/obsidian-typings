import {
  Keymap
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type KeymapConstructor = ExtractConstructor<Keymap>;

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
