import {
  TAbstractFile
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type TAbstractFileConstructor = ExtractConstructor<TAbstractFile>;

/**
 * Get the TAbstractFile constructor.
 *
 * @returns The TAbstractFile constructor.
 *
 * @public
 * @unofficial
 */
export function getTAbstractFileConstructor(): TAbstractFileConstructor {
  return TAbstractFile as unknown as TAbstractFileConstructor;
}
