import {
    WorkspaceFloating
} from 'obsidian';
import type { WorkspaceFloatingConstructor } from '../../../internals/constructors/augmentations/WorkspaceFloatingConstructor.d.ts';

/**
 * Get the WorkspaceFloating constructor.
 *
 * @returns The WorkspaceFloating constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceFloatingConstructor(): WorkspaceFloatingConstructor {
    return WorkspaceFloating as WorkspaceFloatingConstructor;
}
