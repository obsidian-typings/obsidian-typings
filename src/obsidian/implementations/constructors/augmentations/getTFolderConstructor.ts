import {
  TFolder
} from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the TFolder constructor.
 *
 * @returns The TFolder constructor.
 *
 * @public
 * @unofficial
 */
export function getTFolderConstructor(): ExtractConstructor<TFolder> {
  return TFolder as ExtractConstructor<TFolder>;
}
