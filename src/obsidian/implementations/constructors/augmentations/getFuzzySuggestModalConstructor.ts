import {
  FuzzySuggestModal
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the FuzzySuggestModal constructor.
 *
 * @returns The FuzzySuggestModal constructor.
 *
 * @public
 * @unofficial
 */
export function getFuzzySuggestModalConstructor(): ExtractConstructor<FuzzySuggestModal<unknown>> {
  return FuzzySuggestModal as ExtractConstructor<FuzzySuggestModal<unknown>>;
}
