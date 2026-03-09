import {
  Scope
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type ScopeConstructor = ExtractConstructor<Scope>;

/**
 * Get the Scope constructor.
 *
 * @returns The Scope constructor.
 *
 * @public
 * @unofficial
 */
export function getScopeConstructor(): ScopeConstructor {
  return Scope as ScopeConstructor;
}
