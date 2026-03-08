import {
    WorkspaceSplit
} from 'obsidian';
import type { WorkspaceSplitConstructor } from '../../../internals/constructors/augmentations/WorkspaceSplitConstructor.ts';

/**
 * Get the WorkspaceSplit constructor.
 *
 * @returns The WorkspaceSplit constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceSplitConstructor(): WorkspaceSplitConstructor {
    return WorkspaceSplit as WorkspaceSplitConstructor;
}
