import {
    WorkspaceTabs
} from 'obsidian';
import type { WorkspaceTabsConstructor } from '../../../internals/Constructors/augmentations/WorkspaceTabsConstructor.ts';

/**
 * Get the WorkspaceTabs constructor.
 *
 * @returns The WorkspaceTabs constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceTabsConstructor(): WorkspaceTabsConstructor {
    return WorkspaceTabs as WorkspaceTabsConstructor;
}
