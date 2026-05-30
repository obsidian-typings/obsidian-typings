import { BasesEntryGroup } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#BasesEntryGroup} constructor.
 *
 * @returns The {@link obsidian#BasesEntryGroup} constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesEntryGroupConstructor(): ExtractConstructor<BasesEntryGroup> {
  return BasesEntryGroup as ExtractConstructor<BasesEntryGroup>;
}
