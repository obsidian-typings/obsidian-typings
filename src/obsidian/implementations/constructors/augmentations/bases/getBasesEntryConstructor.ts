import {
  BasesEntry
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type BasesEntryConstructor = ExtractConstructor<BasesEntry>;

/**
 * Get the BasesEntry constructor.
 *
 * @returns The BasesEntry constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesEntryConstructor(): BasesEntryConstructor {
  return BasesEntry as BasesEntryConstructor;
}
