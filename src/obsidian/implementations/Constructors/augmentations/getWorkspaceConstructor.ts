import {
    Workspace
} from 'obsidian';
import type { WorkspaceConstructor } from '../../../internals/Constructors/augmentations/WorkspaceConstructor.ts';

/**
 * Get the Workspace constructor.
 *
 * @returns The Workspace constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceConstructor(): WorkspaceConstructor {
    return Workspace as WorkspaceConstructor;
}
