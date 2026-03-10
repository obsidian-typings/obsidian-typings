import {
  BasesEntryGroup
} from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the BasesEntryGroup constructor.
 *
 * @returns The BasesEntryGroup constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesEntryGroupConstructor(): ExtractConstructor<BasesEntryGroup> {
  return BasesEntryGroup as ExtractConstructor<BasesEntryGroup>;
}
