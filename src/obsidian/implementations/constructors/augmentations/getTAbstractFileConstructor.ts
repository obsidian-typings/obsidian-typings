import { TAbstractFile } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#TAbstractFile} constructor.
 *
 * @returns The {@link obsidian#TAbstractFile} constructor.
 *
 * @public
 * @unofficial
 */
export function getTAbstractFileConstructor(): ExtractConstructor<TAbstractFile> {
  return TAbstractFile as unknown as ExtractConstructor<TAbstractFile>;
}
