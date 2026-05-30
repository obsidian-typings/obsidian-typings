import { TFile } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#TFile} constructor.
 *
 * @returns The {@link obsidian#TFile} constructor.
 *
 * @public
 * @unofficial
 */
export function getTFileConstructor(): ExtractConstructor<TFile> {
  return TFile as ExtractConstructor<TFile>;
}
