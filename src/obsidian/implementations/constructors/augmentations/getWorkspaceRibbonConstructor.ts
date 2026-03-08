import {
    WorkspaceRibbon
} from 'obsidian';
import type { WorkspaceRibbonConstructor } from '../../../internals/constructors/augmentations/WorkspaceRibbonConstructor.d.ts';

/**
 * Get the WorkspaceRibbon constructor.
 *
 * @returns The WorkspaceRibbon constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceRibbonConstructor(): WorkspaceRibbonConstructor {
    return WorkspaceRibbon as WorkspaceRibbonConstructor;
}
