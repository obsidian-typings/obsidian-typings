import {
  FuzzySuggestModal
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type FuzzySuggestModalConstructor = ExtractConstructor<FuzzySuggestModal<unknown>>;

/**
 * Get the FuzzySuggestModal constructor.
 *
 * @returns The FuzzySuggestModal constructor.
 *
 * @public
 * @unofficial
 */
export function getFuzzySuggestModalConstructor(): FuzzySuggestModalConstructor {
  return FuzzySuggestModal as FuzzySuggestModalConstructor;
}
