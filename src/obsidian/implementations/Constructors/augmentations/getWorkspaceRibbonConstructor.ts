import {
    WorkspaceRibbon
} from 'obsidian';
import type { WorkspaceRibbonConstructor } from '../../../internals/Constructors/augmentations/WorkspaceRibbonConstructor.ts';

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
