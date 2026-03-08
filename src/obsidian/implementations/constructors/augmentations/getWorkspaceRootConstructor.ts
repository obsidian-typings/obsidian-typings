import {
    WorkspaceRoot
} from 'obsidian';
import type { WorkspaceRootConstructor } from '../../../internals/constructors/augmentations/WorkspaceRootConstructor.ts';

/**
 * Get the WorkspaceRoot constructor.
 *
 * @returns The WorkspaceRoot constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceRootConstructor(): WorkspaceRootConstructor {
    return WorkspaceRoot as WorkspaceRootConstructor;
}
