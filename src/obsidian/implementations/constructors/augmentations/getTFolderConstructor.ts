import { TFolder } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#TFolder} constructor.
 *
 * @returns The {@link obsidian#TFolder} constructor.
 *
 * @public
 * @unofficial
 */
export function getTFolderConstructor(): ExtractConstructor<TFolder> {
  return TFolder as ExtractConstructor<TFolder>;
}
