import {
    Scope
} from 'obsidian';
import type { ScopeConstructor } from '../../../internals/constructors/augmentations/ScopeConstructor.d.ts';

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
