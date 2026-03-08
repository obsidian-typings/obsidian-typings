import {
    WorkspaceLeaf
} from 'obsidian';
import type { WorkspaceLeafConstructor } from '../../../internals/constructors/augmentations/WorkspaceLeafConstructor.d.ts';

/**
 * Get the WorkspaceLeaf constructor.
 *
 * @returns The WorkspaceLeaf constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceLeafConstructor(): WorkspaceLeafConstructor {
    return WorkspaceLeaf as WorkspaceLeafConstructor;
}
