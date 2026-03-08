import {
    TFolder
} from 'obsidian';
import type { TFolderConstructor } from '../../../internals/constructors/augmentations/TFolderConstructor.d.ts';

/**
 * Get the TFolder constructor.
 *
 * @returns The TFolder constructor.
 *
 * @public
 * @unofficial
 */
export function getTFolderConstructor(): TFolderConstructor {
    return TFolder as TFolderConstructor;
}
