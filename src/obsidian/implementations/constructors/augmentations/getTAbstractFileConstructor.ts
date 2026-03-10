import {
  TAbstractFile
} from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the TAbstractFile constructor.
 *
 * @returns The TAbstractFile constructor.
 *
 * @public
 * @unofficial
 */
export function getTAbstractFileConstructor(): ExtractConstructor<TAbstractFile> {
  return TAbstractFile as unknown as ExtractConstructor<TAbstractFile>;
}
