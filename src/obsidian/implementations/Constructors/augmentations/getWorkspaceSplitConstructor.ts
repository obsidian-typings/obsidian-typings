import {
    WorkspaceSplit
} from 'obsidian';
import type { WorkspaceSplitConstructor } from '../../../internals/Constructors/augmentations/WorkspaceSplitConstructor.ts';

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
