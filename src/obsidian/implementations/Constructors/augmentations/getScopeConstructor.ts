import {
    Scope
} from 'obsidian';
import type { ScopeConstructor } from '../../../internals/Constructors/augmentations/ScopeConstructor.ts';

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
