import { BasesEntry } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#BasesEntry} constructor.
 *
 * @returns The {@link obsidian#BasesEntry} constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesEntryConstructor(): ExtractConstructor<BasesEntry> {
  return BasesEntry as ExtractConstructor<BasesEntry>;
}
