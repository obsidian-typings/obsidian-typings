import {
    TFolder
} from 'obsidian';
import type { TFolderConstructor } from '../../internals/Constructors/TFolderConstructor.ts';

/**
 * Get the TFolder constructor.
 *
 * @returns The TFolder constructor.
 * @public
 */
export function getTFolderConstructor(): TFolderConstructor {
    return TFolder as TFolderConstructor;
}
