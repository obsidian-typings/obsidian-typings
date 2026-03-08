import {
    TFolder
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type TFolderConstructor = ExtractConstructor<TFolder>;

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
