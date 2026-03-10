import {
  BasesEntryGroup
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type BasesEntryGroupConstructor = ExtractConstructor<BasesEntryGroup>;

/**
 * Get the BasesEntryGroup constructor.
 *
 * @returns The BasesEntryGroup constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesEntryGroupConstructor(): BasesEntryGroupConstructor {
  return BasesEntryGroup as BasesEntryGroupConstructor;
}
